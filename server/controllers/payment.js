import Payment from "../models/Payment.js";
import Project from "../models/Project.js";
import PaymentCategory from "../models/PaymentCategory.js";
import createError from "http-errors";

// Payment ekleme
export const addPayment = async (req, res, next) => {
  const { projectId, title, category, amount } = req.body;

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return next(createError(400, "Geçersiz miktar."));
  }

  try {
    const paymentCategory = await PaymentCategory.findById(category);
    if (!paymentCategory) {
      return next(createError(404, "Geçersiz ödeme kategorisi."));
    }
    const newPayment = new Payment({
      projectId,
      title,
      category,
      amount: numericAmount,
      date: Date.now(),
    });
    const savedPayment = await newPayment.save();

    // Projeyi güncelle
    const project = await Project.findById(projectId);
    project.payments.push(savedPayment._id);
    project.totalPayments += numericAmount;
    project.balance = project.totalCosts - project.totalPayments;
    project.earning = project.totalPayments - project.totalCosts;
    await project.save();

    res.status(201).json(savedPayment);
  } catch (err) {
    next(err);
  }
};

// Payment güncelleme
export const updatePayment = async (req, res, next) => {
  const { id } = req.params;
  const { title, category, amount, date } = req.body;

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return next(createError(400, "Geçersiz miktar."));
  }

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    const oldAmount = payment.amount;

    const updatedPayment = await Payment.findByIdAndUpdate(
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
    const project = await Project.findById(payment.projectId);
    project.totalPayments = project.totalPayments - oldAmount + numericAmount;
    project.balance = project.totalCosts - project.totalPayments;
    project.earning = project.totalPayments - project.totalCosts;
    await project.save();

    res.status(200).json(updatedPayment);
  } catch (err) {
    next(err);
  }
};

// Payment silme
export const deletePayment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    const project = await Project.findById(deletedPayment.projectId);
    project.payments.pull(deletedPayment._id);
    project.totalPayments -= deletedPayment.amount;
    project.balance = project.totalCosts - project.totalPayments;
    project.earning = project.totalPayments - project.totalCosts;
    await project.save();

    res.status(200).json({ success: true, message: "Payment deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Payment listesi
export const getPayments = async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const payments = await Payment.find({ projectId });

    if (!payments) {
      return res.status(404).json({ success: false, message: "No payments found" });
    }

    res.status(200).json(payments);
  } catch (err) {
    next(err);
  }
};

// Kullanıcı ID'sine göre Payment listesi
export const getPaymentsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const projects = await Project.find({ userId });
    if (!projects || projects.length === 0) {
      return res.status(404).json({ success: false, message: "Kullanıcıya ait projeler bulunamadı." });
    }
    const projectIds = projects.map(project => project._id);
    const payments = await Payment.find({ projectId: { $in: projectIds } });
    if (!payments || payments.length === 0) {
      return res.status(404).json({ success: false, message: "Kullanıcıya ait payments bulunamadı." });
    }
    res.status(200).json(payments);
  } catch (err) {
    next(err);
  }
};
