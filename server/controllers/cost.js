import Cost from "../models/Cost.js";
import Project from "../models/Project.js";
import CostCategory from "../models/CostCategory.js";
import createError from "http-errors";

// Cost ekleme
export const addCost = async (req, res, next) => {
  const { projectId, title, category, amount } = req.body;

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return next(createError(400, "Geçersiz gider miktarı."));
  }

  try {
    const costCategory = await CostCategory.findById(category);
    if (!costCategory) {
      return next(createError(404, "Geçersiz gider kategorisi."));
    }
    const newCost = new Cost({
      projectId,
      title,
      category,
      amount: numericAmount,
      date: Date.now(),
    });
    const savedCost = await newCost.save();

    // Projeyi güncelle
    const project = await Project.findById(projectId);
    project.costs.push(savedCost._id);
    project.totalCosts += numericAmount;
    project.balance = project.totalCosts - project.totalPayments;
    project.earning = project.totalPayments - project.totalCosts;
    await project.save();

    res.status(201).json(savedCost);
  } catch (err) {
    next(err);
  }
};

// Cost güncelleme
export const updateCost = async (req, res, next) => {
  const { id } = req.params;
  const { title, category, amount, date } = req.body;

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return next(createError(400, "Geçersiz gider miktarı."));
  }

  try {
    const cost = await Cost.findById(id);
    if (!cost) {
      return res.status(404).json({ success: false, message: "Cost not found" });
    }

    const oldAmount = cost.amount;

    const updatedCost = await Cost.findByIdAndUpdate(
      id,
      {
        title,
        category,
        amount: numericAmount,
        date,
      },
      { new: true }
    );

    // Projeyi güncelle
    const project = await Project.findById(cost.projectId);
    project.totalCosts = project.totalCosts - oldAmount + numericAmount;
    project.balance = project.totalCosts - project.totalPayments;
    project.earning = project.totalPayments - project.totalCosts;
    await project.save();

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

    // Projeyi güncelle
    const project = await Project.findById(deletedCost.projectId);
    project.costs.pull(deletedCost._id);
    project.totalCosts -= deletedCost.amount;
    project.balance = project.totalCosts - project.totalPayments;
    project.earning = project.totalPayments - project.totalCosts;
    await project.save();

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
