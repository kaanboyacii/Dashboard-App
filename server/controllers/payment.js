import Payment from "../models/Payment.js";
import Project from "../models/Project.js";
import PaymentCategory from "../models/PaymentCategory.js";
import createError from "http-errors";

// Payment ekleme
export const addPayment = async (req, res, next) => {
  const { projectId, title, category, amount, date } = req.body;
  try {
    const paymentCategory = await PaymentCategory.findById(category);
    if (!paymentCategory) {
      return next(createError(404, "Geçersiz ödeme kategorisi."));
    }
    const newPayment = new Payment({
      projectId,
      title,
      category,
      amount,
      date,
    });
    const savedPayment = await newPayment.save();
    await Project.findByIdAndUpdate(projectId, {
      $push: { payments: savedPayment._id },
    });
    res.status(201).json(savedPayment);
  } catch (err) {
    next(err);
  }
};

// Payment güncelleme
export const updatePayment = async (req, res, next) => {
  const { id } = req.params;
  const { title, category, amount, date } = req.body;
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      {
        title,
        category,
        amount,
        date,
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

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

    await Project.findByIdAndUpdate(deletedPayment.projectId, {
      $pull: { payments: deletedPayment._id },
    });

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
