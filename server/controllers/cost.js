import Cost from "../models/Cost.js";
import Project from "../models/Project.js";

// Cost ekleme
export const addCost = async (req, res, next) => {
  const { projectId, title, category, amount, date } = req.body;
  try {
    const newCost = new Cost({
      projectId,
      title,
      category,
      amount,
      date,
    });
    const savedCost = await newCost.save();

    await Project.findByIdAndUpdate(projectId, {
      $push: { costs: savedCost._id },
    });

    res.status(201).json(savedCost);
  } catch (err) {
    next(err);
  }
};

// Cost güncelleme
export const updateCost = async (req, res, next) => {
  const { id } = req.params;
  const { title, category, amount, date } = req.body;
  try {
    const updatedCost = await Cost.findByIdAndUpdate(
      id,
      {
        title,
        category,
        amount,
        date,
      },
      { new: true }
    );

    if (!updatedCost) {
      return res.status(404).json({ success: false, message: "Cost not found" });
    }

    res.status(200).json(updatedCost);
  } catch (err) {
    next(err);
  }
};

// Cost silme
export const deleteCost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCost = await Cost.findByIdAndDelete(id);

    if (!deletedCost) {
      return res.status(404).json({ success: false, message: "Cost not found" });
    }

    await Project.findByIdAndUpdate(deletedCost.projectId, {
      $pull: { costs: deletedCost._id },
    });

    res.status(200).json({ success: true, message: "Cost deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Cost listesi
export const getCosts = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const costs = await Cost.find({ projectId });

    if (!costs) {
      return res.status(404).json({ success: false, message: "No costs found" });
    }

    res.status(200).json(costs);
  } catch (err) {
    next(err);
  }
};
