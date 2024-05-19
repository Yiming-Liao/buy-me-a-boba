import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    receiveUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    money: {
        grossAmount: {
            type: Number,
            required: true
        },
        netAmount: {
            type: Number,
            required: true
        },
        paypalFee: {
            type: Number,
            required: true
        },
        commissionForPlatform: {
            type: Number,
            required: true
        },
        receiveUserGet: {
            type: Number,
            required: true
        }
    },
    message: {
        type: String
    },
    title: {
        type: String
    },
    selectedAvatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
