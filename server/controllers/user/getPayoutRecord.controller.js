import User from '../../models/user.model.js';

export const getPayoutRecord = async (req, res) => {
    try {
        const { userId } = req.body;

        // 檢查用戶是否存在並填充 payout 資訊
        const updatedUser = await User.findOne({ _id: userId })
            .populate({
                path: 'payout',
                model: 'Payout',
                select: 'payoutUser payoutTotal createdAt'
            });

        if (!updatedUser) return res.status(400).json({ error: "❌User does not exist" });

        // 傳回前端
        res.status(200).json(updatedUser.payout);

    } catch (error) {
        console.log("❌Error Login: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}


