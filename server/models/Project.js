import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  profitRate: {
    type: Number,
  },
  balance: {
    type: Number,
    default: 0,
  },
  earning: {
    type: Number,
    default: 0,
  },
  totalCosts: {
    type: Number,
    default: 0,
  },
  totalPayments: {
    type: Number,
    default: 0,
  },
  costs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cost",
  }],
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  }],
  costsCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CostCategory",
  }],
  paymentsCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentCategory",
  }],
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);
