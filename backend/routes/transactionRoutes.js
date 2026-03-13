const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { addTransaction, getTransactions, deleteTransaction, updateTransaction, getCategorySummary, getMonthlySummary, getAIInsights, chatWithAI } = require("../controllers/transactionController");
const {protect} = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  [
    body("type").isIn(["income", "expense"]).withMessage("Invalid transaction type"),
    body("amount").isNumeric().withMessage("Amount must be a number"),
    body("category").notEmpty().withMessage("Category is required")
  ],
  addTransaction
);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);
router.get("/category-summary", protect, getCategorySummary);
router.get("/monthly-summary", protect, getMonthlySummary);
router.put("/:id", protect, updateTransaction);
router.get("/ai-insights", protect, getAIInsights);
router.post("/ai-chat", protect, chatWithAI);

module.exports = router;