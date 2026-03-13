const Transaction = require("../models/Transaction");
const { validationResult } = require("express-validator");
const { categorizeExpense } = require("../services/aiService");
const { generateInsights } = require("../services/aiService");
const { financialChat } = require("../services/aiService");
const Budget = require("../models/Budget")

const addTransaction = async (req, res) => {
  try {

    const { type, amount, category, description, date } = req.body;

    let finalCategory = category;

    if (!category && description) {
    finalCategory = await categorizeExpense(description);
  }

    const transaction = await Transaction.create({
      user: req.user,
      type,
      amount,
      category:finalCategory,
      description,
      date
    });

    res.status(201).json({
      message: "Transaction added successfully",
      transaction
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
  const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array()
    });
  }
};

const getTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find({
      user: req.user
    }).sort({ date: -1 });

    res.json(transactions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    if (transaction.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    await transaction.deleteOne();

    res.json({
      message: "Transaction deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
     });
    }
};

const getCategorySummary = async (req, res) => {

  try {

    const transactions = await Transaction.find({
      type: "expense"
    });

    const summary = {};

    transactions.forEach((t) => {

      const category = t.category.toLowerCase(); // normalize category

      if (!summary[category]) {
        summary[category] = 0;
      }

      summary[category] += t.amount;

    });

    const result = Object.keys(summary).map((category) => ({
      category,
      total: summary[category]
    }));

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

const getMonthlySummary = async (req, res) => {
  try {

    const transactions = await Transaction.find({
      user: req.user,
      type: "expense"
    });

    const monthlyTotals = {};

    transactions.forEach((transaction) => {

      const month = new Date(transaction.date).toLocaleString("default", {
        month: "short"
      });

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }

      monthlyTotals[month] += transaction.amount;

    });

    const result = Object.keys(monthlyTotals).map(month => ({
      month,
      total: monthlyTotals[month]
    }));

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const updateTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    if (transaction.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTransaction);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getAIInsights = async (req, res) => {
  try {

    const transactions = await Transaction.find({ user: req.user._id });

    const insights = await generateInsights(transactions);

    res.json({ insights });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

const chatWithAI = async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required"
      });
    }

    const transactions = await Transaction.find({ user: req.user._id });
    const budgets = await Budget.find({
      user: req.user._id
    })

    const answer = await financialChat(message, transactions,budgets);

    res.json({
      reply: answer
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = { 
  addTransaction, 
  getTransactions, 
  deleteTransaction, 
  getCategorySummary, 
  getMonthlySummary, 
  updateTransaction,
  getAIInsights,
  chatWithAI
};