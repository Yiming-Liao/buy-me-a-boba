import User from "../../models/user.model.js";

export const updateAvatar = async (req, res) => {
    try {
        const avatarUrl = req.file.location; // 從 multer-s3 獲得的文件位置

        // 查找並更新用戶頭像 URL
        const foundUser = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $set: { "avatar.avatarUrl": avatarUrl } },  // $set 明確指定只更新的字段
            { new: true }
        );

        if (!foundUser) return res.status(404).json({ error: "❌Username or email does not exist" });

        res.status(200).json({ avatarUrl: foundUser.avatar.avatarUrl });

    } catch (error) {
        console.log("❌Error Update Avatar: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}

