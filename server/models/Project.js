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
    costs: {
        type: [
            {
                title: {
                    type: String
                },
                amount: {
                    type: Number
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
            },
        ],
        default: [],
    },
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);