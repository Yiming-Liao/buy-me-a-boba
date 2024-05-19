export const logout = async (req, res) => {
    try {
        // 清除 cookie，確保使用和設置 cookie 時相同的選項
        res.cookie("jwt", "", {
            maxAge: 0, // 立即過期
            httpOnly: true, // 如果設置時使用了 httpOnly，這裡也需要設置
            secure: process.env.NODE_ENV !== 'development', // 設置安全選項與設置 cookie 時相同
            sameSite: 'None' // 如果有設置 sameSite，這裡也需要匹配
        });
        res.status(200).json({ message: "✅Logout Successfully" });
        console.log(`🍪 [ Cookie: "jwt", "" ] CLEAN! 🍪`);

    } catch (error) {
        console.log("❌Error Logout: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
}
