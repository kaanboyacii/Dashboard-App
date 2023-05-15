import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    contact: {
        type: String
    },
    balance: {
        type: Number,
        default: 0,
    },
    earning: {
        type: Number,
        default: 0,
    },
    totalCosts: {
        type: Number,
        default: 0,
    },
    totalPayments: {
        type: Number,
        default: 0,
    },
    costs: {
        type: [
            {
                title: {
                    type: String
                },
                amount: {
                    type: Number
                },
                date: {
                    type: Date
                },
            },
        ],
        default: [],
    },
    payments: {
        type: [
            {
                title: {
                    type: String
                },
                amount: {
                    type: Number
                },
                date: {
                    type: Date
                },
            },
        ],
        default: [],
    },
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);