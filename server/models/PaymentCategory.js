import mongoose from "mongoose";

const PaymentCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

export default mongoose.model("PaymentCategory", PaymentCategorySchema);
