import User from '../../models/user.model.js';

export const getUser = async (req, res) => {
    try {
        const { username } = req.body;

        // 檢查用戶是否存在並填充 payment 資訊
        const updatedUser = await User.findOne({ username: username })
            .populate({
                path: 'payment',
                model: 'Payment',
                select: 'quantity message title selectedAvatar createdAt'
            });

        if (!updatedUser) return res.status(400).json({ error: "❌User does not exist" });

        // 傳回前端
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            avatar: {
                avatarUrl: updatedUser.avatar.avatarUrl,
                defaultUrl: updatedUser.avatar.defaultUrl
            },
            payment: updatedUser.payment
        });

    } catch (error) {
        console.log("❌Error Login: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}


