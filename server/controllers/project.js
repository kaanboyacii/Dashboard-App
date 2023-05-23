import { createError } from "../error.js";
import User from "../models/User.js"
import Project from "../models/Project.js";

export const addProject = async (req, res, next) => {
  const newProject = new Project({ userId: req.user.id, ...req.body });
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject)
  } catch (err) {
    next(err)
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, "Project not found!"));
    if (req.user.id === project.userId) {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      let totalCosts = 0;
      updatedProject.costs.forEach((cost) => {
        totalCosts += cost.amount;
      });

      let totalPayments = 0;
      updatedProject.payments.forEach((payment) => {
        totalPayments += payment.amount;
      });

      let earning = totalPayments - totalCosts;

      let balance = earning >= 0 ? 0 : Math.abs(earning);

      updatedProject.totalCosts = totalCosts;
      updatedProject.totalPayments = totalPayments;

      updatedProject.balance = balance;
      updatedProject.earning = earning;

      await updatedProject.save();

      res.status(200).json(updatedProject);
    } else {
      return next(createError(403, "You can update only your Project!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const paymentId = req.params.paymentId;

    const project = await Project.findById(projectId);
    if (!project) {
      return next(createError(404, "Proje bulunamadı!"));
    }

    const payment = project.payments.find(
      (payment) => payment._id.toString() === paymentId
    );
    if (!payment) {
      return next(createError(404, "Ödeme bulunamadı."));
    }

    if (req.user.id !== project.userId.toString()) {
      return next(
        createError(
          403,
          "Yalnızca kendi projenizin ödemesini silebilirsiniz!"
        )
      );
    }

    project.payments = project.payments.filter(
      (payment) => payment._id.toString() !== paymentId
    );
    const updatedProject = await project.save();

    // Güncelleme işlemi
    await updateProjectCalculations(updatedProject);

    res.status(200).json("Ödeme silindi.");
  } catch (error) {
    console.error(error);
    return next(createError(500, "Sunucu hatası"));
  }
};

export const deleteCost = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const costId = req.params.costId;

    const project = await Project.findById(projectId);
    if (!project) {
      return next(createError(404, "Proje bulunamadı!"));
    }

    const cost = project.costs.find((cost) => cost._id.toString() === costId);
    if (!cost) {
      return next(createError(404, "Maliyet bulunamadı."));
    }

    if (req.user.id !== project.userId.toString()) {
      return next(
        createError(403, "Yalnızca kendi projenizin maliyetini silebilirsiniz!")
      );
    }

    project.costs = project.costs.filter(
      (cost) => cost._id.toString() !== costId
    );
    const updatedProject = await project.save();

    // Güncelleme işlemi
    await updateProjectCalculations(updatedProject);

    res.status(200).json("Maliyet silindi.");
  } catch (error) {
    console.error(error);
    return next(createError(500, "Sunucu hatası"));
  }
};

// Proje hesaplamalarını güncelleme işlemi için yardımcı fonksiyon
export const updateProjectCalculations = async (project) => {
  let totalCosts = 0;
  project.costs.forEach((cost) => {
    totalCosts += cost.amount;
  });

  let totalPayments = 0;
  project.payments.forEach((payment) => {
    totalPayments += payment.amount;
  });

  let earning = totalPayments - totalCosts;

  let balance = earning >= 0 ? 0 : Math.abs(earning);

  project.totalCosts = totalCosts;
  project.totalPayments = totalPayments;

  project.balance = balance;
  project.earning = earning;

  await project.save();
};


export const addCostsCategory = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı.' });
    }

    // Kategori ekleme
    project.costsCategory.push(category);
    await project.save();

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ error: 'Bir hata oluştu.' });
  }
};

export const addPaymentsCategory = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Proje bulunamadı.' });
    }

    // Kategori ekleme
    project.paymentsCategory.push(category);
    await project.save();

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ error: 'Bir hata oluştu.' });
  }
};


export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return next(createError(404, 'Project not found!'));
    if (req.user.id === project.userId) {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      res.status(200).json('Project has been deleted.');
    } else {
      return next(createError(403, 'You can delete only your project!'));
    }
  } catch (error) {
    next(error);
  }
};

export const getAllProject = async (req, res, next) => {
  try {
    const Projects = await Project.find({});
    res.status(200).json(Projects);
  } catch (err) {
    next(err);
  }
};


export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    next(err)
  }
};

export const getProjectsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const Projects = await Project.find({ userId });
    res.status(200).json(Projects);
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const Projects = await Project.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(Projects);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const Projects = await Project.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(Projects);
  } catch (err) {
    next(err);
  }
};