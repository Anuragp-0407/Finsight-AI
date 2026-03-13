const Transaction = require("../models/Transaction");

const getDashboard = async (req, res) => {
  try {

    const transactions = await Transaction.find({ user: req.user });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {

      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }

    });

    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = { getDashboard };