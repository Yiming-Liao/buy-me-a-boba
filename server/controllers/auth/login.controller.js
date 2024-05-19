import bcrypt from "bcryptjs";
import User from '../../models/user.model.js';
import generateTokenAndSetCookie from '../../utils/generateToken.js'

export const login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // 檢查資料
        const foundUser = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!foundUser) return res.status(400).json({ error: "❌Username or email does not exist", reason: "usernameOrEmail" });
        if (!await bcrypt.compare(password, foundUser.password || "")) return res.status(400).json({ error: "❌Password is not correct", reason: "password" });

        // 生成 token 並設置 cookie
        generateTokenAndSetCookie(foundUser._id, res);

        // 回傳成功資料
        res.status(200).json({
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            avatar: {
                avatarUrl: foundUser.avatar.avatarUrl,
                defaultUrl: foundUser.avatar.defaultUrl
            }
        });

    } catch (error) {
        console.log("❌Error Login: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}


