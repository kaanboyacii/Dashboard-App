import PaymentCategory from "../models/PaymentCategory.js";
import createError from "http-errors";
import Project from "../models/Project.js";

// Tüm kategori listesini getirme
export const getAllPaymentCategoriesForProject = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return next(createError(404, "Proje bulunamadı."));
    }
    const paymentCategories = await PaymentCategory.find({ _id: { $in: project.paymentsCategory } });
    res.status(200).json(paymentCategories);
  } catch (error) {
    next(error);
  }
};

// Yeni bir kategori oluşturma
export const createPaymentCategory = async (req, res, next) => {
  const { projectId, name } = req.body;
  try {
    const newPaymentCategory = new PaymentCategory({
      projectId,
      name,
    });
    const savedPaymentCategory = await newPaymentCategory.save();
    await Project.findByIdAndUpdate(projectId, {
      $push: { paymentsCategory: savedPaymentCategory._id },
    });
    res.status(201).json(savedPaymentCategory);
  } catch (err) {
    next(err);
  }
};

// Bir kategoriyi güncelleme
export const updatePaymentCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, project } = req.body;
  try {
    const updatedCategory = await PaymentCategory.findByIdAndUpdate(
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
export const deletePaymentCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await PaymentCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return next(createError(404, "Kategori bulunamadı."));
    }
    await Project.findByIdAndUpdate(deletedCategory.projectId, {
      $pull: { paymentsCategory: deletedCategory._id },
    });
    res.status(200).json({ message: "Kategori başarıyla silindi." });
  } catch (error) {
    next(error);
  }
};
