import User from '../../models/user.model.js'; // 確保這裡導入的是 User model

export async function incReceiveUserGet(paymentData) {
    try {
        // 確保 netAmount 是數字型態
        const incNumber = parseFloat(paymentData.money.receiveUserGet);
        if (isNaN(incNumber)) {
            throw new Error("netAmount must be a valid number");
        }

        // 更新 User 的 totalAmount
        await User.findByIdAndUpdate(paymentData.receiveUser, {
            $inc: { totalAmount: incNumber } // 使用 User model 來增加 incNumber 到總金額
        });

        console.log("Payment created and user totalAmount updated.");
    } catch (error) {
        console.error("Error updating user totalAmount:", error);
    }
}
