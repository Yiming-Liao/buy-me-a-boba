import User from '../../models/user.model.js';

export const getUserPrivate = async (req, res) => {
    try {
        const { userId } = req.body;

        // 檢查用戶是否存在並填充 payment 資訊
        const updatedUser = await User.findById(userId)
            .populate({
                path: 'payment',
                model: 'Payment',
                select: 'receiveUser quantity money message title selectedAvatar createdAt'
            });

        if (!updatedUser) return res.status(400).json({ error: "❌User does not exist" });

        // 傳回前端
        res.status(200).json({
            totalAmount: updatedUser.totalAmount,
            payment: updatedUser.payment
        });

    } catch (error) {
        console.log("❌Error Login: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}


