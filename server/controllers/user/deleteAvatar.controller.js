import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import User from "../../models/user.model.js";

// S3 客戶端配置
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export const deleteAvatarFromS3 = async (req, res) => {
    try {
        const userId = req.user._id; // protectRoute: req.user = user;

        // 檢查資料
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "❌User does not exist" });
        if (!user.avatar.avatarUrl) return res.status(404).json({ error: "❌[avatarUrl] does not exist" });

        // 從用戶的 avatarUrl 提取 S3 的 Key
        const url = new URL(user.avatar.avatarUrl);
        const key = url.pathname.substring(1); // 移除URL開頭的 '/'

        // S3 刪除命令
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };
        await s3.send(new DeleteObjectCommand(deleteParams));

        // 更新 MongoDB
        user.avatar.avatarUrl = ""; // 移除頭像 URL
        await user.save();

        // 傳回前端
        res.status(200).json({ avatarUrl: user.avatar.avatarUrl });

    } catch (error) {
        console.log("❌Error Delete Avatar: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
};
