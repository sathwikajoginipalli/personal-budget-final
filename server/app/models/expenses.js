const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const expensesSchema = new mongoose.Schema(
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
    expense: {
      type: Number,
      required: true,
    },
  },
  { collection: "expenses" },
  { timestamps: true }
);

module.exports = mongoose.model("Expenses", expensesSchema, "expenses");
