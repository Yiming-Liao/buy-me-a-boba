import bcrypt from "bcryptjs";
import User from '../../models/user.model.js';
import generateTokenAndSetCookie from '../../utils/generateToken.js'

export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // 檢查資料
        if (username.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") return res.status(400).json({ error: "❌ Missing Information" });
        if (password.length < 6) return res.status(400).json({ error: "❌Password less than 6 character" });
        if (password !== confirmPassword) return res.status(400).json({ error: "❌Password don't match" });
        if (await User.findOne({ username })) return res.status(400).json({ error: "❌Username already exists" });
        if (await User.findOne({ email })) return res.status(400).json({ error: "❌Email already exists" });

        // 密碼加密
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 創建新用戶 (Model: User)
        const newUser = new User({
            username, email, password: hashedPassword,
            avatar: {
                avatarUrl: "",
                defaultUrl: `https://avatar-placeholder-api.fly.dev/avatar/circle/${username}`
            }
        });
        if (!newUser) return res.status(400).json({ error: "❌Invalid user data" });

        // 把 newUser 儲存至 MongoDB
        await newUser.save();

        // 生成 token 並設置 cookie
        generateTokenAndSetCookie(newUser._id, res);

        // 回傳成功資料給前端
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            avatar: {
                avatarUrl: newUser.avatar.avatarUrl,
                defaultUrl: newUser.avatar.defaultUrl
            }
        });

    } catch (error) {
        console.log("❌Error Signup: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}


