import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/users.js"
import AuthRoutes from "./routes/auth.js"
import ProjectRoutes from "./routes/projects.js"
import OrderRoutes from "./routes/orders.js"
import CostRoutes from "./routes/costs.js";
import PaymentRoutes from "./routes/payments.js";
import CostCategoryRoutes from "./routes/costCategories.js";
import PaymentCategoryRoutes from "./routes/paymentCategories.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connectDB = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to DB")
        })
        .catch((err) => {
            throw (err);
        });
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",AuthRoutes);
app.use("/api/users",UserRoutes);
app.use("/api/projects",ProjectRoutes);
app.use("/api/orders",OrderRoutes);
app.use("/api/costs", CostRoutes);
app.use("/api/payments", PaymentRoutes);
app.use("/api/cost-category", CostCategoryRoutes);
app.use("/api/payment-category", PaymentCategoryRoutes);


app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong !";
    return res.status(status).json({
        success:false,
        status:status,
        message:message,
    });
});

app.listen(8800, () => {
    connectDB();
    console.log("Connected to Server!")
})