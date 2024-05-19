import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema({
    payoutUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    payoutTotal: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payout = mongoose.model("Payout", payoutSchema);

export default Payout;
