import Project from "../models/Project.js";
import { createError } from "../utility/error.js";

// Yeni bir proje oluşturma
export const createProject = async (req, res, next) => {
  const { userId, title, status, desc, contact } = req.body;

  try {
    const newProject = new Project({
      userId,
      title,
      status,
      desc,
      contact,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: "Proje başarıyla oluşturuldu.",
      project: newProject,
    });
  } catch (error) {
    next(error);
  }
};

// Tüm projeleri getirme (kullanıcıya ait)
export const getAllProjectsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const projects = await Project.find({ userId });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Belirli bir proje getirme (proje ID'sine göre)
export const getProjectById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return next(createError(404, "Proje bulunamadı."));
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

// Proje güncelleme
export const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { userId, title, status, desc, contact } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { userId, title, status, desc, contact },
      { new: true }
    );

    if (!updatedProject) {
      return next(createError(404, "Güncellenecek proje bulunamadı."));
    }

    res.status(200).json({
      success: true,
      message: "Proje başarıyla güncellendi.",
      project: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// Proje silme
export const deleteProject = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return next(createError(404, "Silinecek proje bulunamadı."));
    }

    res.status(200).json({
      success: true,
      message: "Proje başarıyla silindi.",
    });
  } catch (error) {
    next(error);
  }
};
