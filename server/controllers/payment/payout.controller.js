import User from '../../models/user.model.js';
import Payout from '../../models/payout.model.js';

export const payout = async (req, res) => {
    try {
        const { username, payoutTotal } = req.body;

        // 檢查資料
        const foundUser = await User.findOne({ username: username });
        if (!foundUser) return res.status(400).json({ error: "❌Username does not exist", reason: "username" });

        const totalAmount = foundUser.totalAmount;

        // 將資訊整理成 payoutData (for Model)
        const payoutData = {
            payoutUser: foundUser._id,
            payoutTotal: payoutTotal,
        };
        // 儲存到 Payout (Model)
        const newPayout = new Payout(payoutData);
        const savedPayout = await newPayout.save();

        // 將 payout_id 儲存到該 User (Model) 並更新總金額
        const updatedUser = await User.findByIdAndUpdate(
            foundUser._id,
            {
                $push: { payout: savedPayout._id },
                $set: { totalAmount: totalAmount - payoutTotal }  // 更新總金額
            },
            { new: true } // 設定為 true 以返回更新後的文檔
        );

        // 回傳成功資料
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            payout: updatedUser.payout,
            totalAmount: updatedUser.totalAmount  // 使用更新後的總金額
        });

    } catch (error) {
        console.log("❌Error Payout: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}


