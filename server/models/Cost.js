import mongoose from "mongoose";

const CostSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CostCategory",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cost", CostSchema);
