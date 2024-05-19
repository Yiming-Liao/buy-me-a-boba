import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        avatarUrl: {
            type: String,
        },
        defaultUrl: {
            type: String
        }
    },
    payment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment"
    }],
    payout: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "payout"
    }],
    totalAmount: { type: Number, default: 0 }
});

const User = mongoose.model("User", userSchema);

export default User;

