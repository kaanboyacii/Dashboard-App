import CostCategory from "../models/CostCategory.js";
import createError from "http-errors";
import Project from "../models/Project.js";

// Tüm kategori listesini getirme
export const getAllCostCategoriesForProject = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return next(createError(404, "Proje bulunamadı."));
    }
    const costCategories = await CostCategory.find({ _id: { $in: project.costsCategory } });
    res.status(200).json(costCategories);
  } catch (error) {
    next(error);
  }
};

// Yeni bir kategori oluşturma
export const createCostCategory = async (req, res, next) => {
  const { projectId, name } = req.body;
  try {
    const newCostCategory = new CostCategory({
      projectId,
      name,
    });
    const savedCostCategory = await newCostCategory.save();
    await Project.findByIdAndUpdate(projectId, {
      $push: { costsCategory: savedCostCategory._id },
    });
    res.status(201).json(savedCostCategory);
  } catch (err) {
    next(err);
  }
};

// Bir kategoriyi güncelleme
export const updateCostCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, project } = req.body;
  try {
    const updatedCategory = await CostCategory.findByIdAndUpdate(
      id,
      { name, project },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return next(createError(404, "Kategori bulunamadı."));
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// Bir kategoriyi silme
export const deleteCostCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await CostCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return next(createError(404, "Kategori bulunamadı."));
    }
    await Project.findByIdAndUpdate(deletedCategory.projectId, {
      $pull: { costsCategory: deletedCategory._id },
    });
    res.status(200).json({ message: "Kategori başarıyla silindi." });
  } catch (error) {
    next(error);
  }
};
