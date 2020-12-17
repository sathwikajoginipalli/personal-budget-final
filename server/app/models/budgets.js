const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const budgetsSchema = new mongoose.Schema(
  {
    _id: {
      type:String,
      sequence_value: 0,
    },
    userId: {
      type: Object,
      ref: "Users",
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: true,
    },
  },
  { collection: "budgets" },
  { timestamps: true }
);

module.exports = mongoose.model("Budgets", budgetsSchema, "budgets");
