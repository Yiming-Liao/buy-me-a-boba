import User from "../../models/user.model.js"

export const updateUserData = async (req, res) => {
    const { _id, username, email } = req.user;
    const newUserData = req.body;

    try {
        // 確認送出請求的使用者資料
        const foundUser = await User.findOne({ _id: _id });
        if (!foundUser) return res.status(404).json({ error: "❌Username does not exist" });
        if (foundUser.username !== username || foundUser.email !== email) return res.status(404).json({ error: "❌User not match" });
        // 檢查想要更改的資料是否已存在
        const exsistUsername = await User.findOne({ username: newUserData.username });
        if (exsistUsername && foundUser._id !== exsistUsername._id) return res.status(404).json({ error: "❌Username already exist", reason: "username" });
        const exsistEmail = await User.findOne({ email: newUserData.email });
        if (exsistEmail && foundUser._id.toString() !== exsistEmail._id.toString()) return res.status(404).json({ error: "❌Email already exist", reason: "email" });

        // 更新 username || email 儲存到 mongoDB
        foundUser.username = newUserData.username;
        foundUser.email = newUserData.email;
        await foundUser.save();

        // 傳回前端
        res.status(200).json({ username: foundUser.username, email: foundUser.email });

    } catch (error) {
        console.log("❌Error Update User Data: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}