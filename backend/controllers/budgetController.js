const Budget = require("../models/Budget");

const createBudget = async (req, res) => {
  try {

    const { category, amount, month } = req.body;

    const budget = await Budget.create({
      user: req.user,
      category,
      amount,
      month
    });

    res.status(201).json({
      message: "Budget created successfully",
      budget
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getBudgets = async (req, res) => {
  try {

    const budgets = await Budget.find({
      user: req.user
    });

    res.json(budgets);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const updateBudget = async (req, res) => {
  try {

    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found"
      });
    }

    if (budget.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBudget);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteBudget = async (req, res) => {
  try {

    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found"
      });
    }

    if (budget.user.toString() !== req.user) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    await budget.deleteOne();

    res.json({
      message: "Budget deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const Transaction = require("../models/Transaction");

const budgetAnalysis = async (req, res) => {
  try {

    const budgets = await Budget.find({ user: req.user });

    const result = [];

    for (let budget of budgets) {

      const transactions = await Transaction.find({
        user: req.user,
        category: budget.category,
        type: "expense"
      });

      let spent = 0;

      transactions.forEach(t => {
        spent += t.amount;
      });

      const remaining = budget.amount - spent;

      result.push({
        category: budget.category,
        budget: budget.amount,
        spent,
        remaining,
        status: spent > budget.amount ? "exceeded" : "safe"
      });

    }

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  budgetAnalysis
};