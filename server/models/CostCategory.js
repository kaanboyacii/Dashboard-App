import mongoose from "mongoose";

const CostCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

export default mongoose.model("CostCategory", CostCategorySchema);
