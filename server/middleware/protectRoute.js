import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// 這是一個異步中間件函數，用於保護路由
const protectRoute = async (req, res, next) => {

    try {
        // 從請求的 cookies 中獲取 token
        const token = req.cookies.jwt;
        // 如果 token 不存在，返回 401 無授權錯誤
        if (!token) return res.status(401).json({ error: "❌Unauthorized - No Token Provided" });

        // 驗證 token 是否有效
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 如果 token 驗證失敗，返回 401 無授權錯誤
        if (!decoded) return res.status(401).json({ error: "❌Unauthorized - Invalid Token" });


        // 根據 token 解碼後的 userId，從資料庫中查找用戶，但不包括密碼字段
        const foundUser = await User.findById(decoded.userId).select("-password");
        // 如果沒有找到用戶，返回 404 用戶未找到錯誤
        if (!foundUser) return res.status(404).json({ error: "❌User not found" });

        // 將用戶信息添加到請求對象中，以便後續中間件可以使用
        req.user = foundUser;

        // 調用 next() 繼續處理請求
        next();
    } catch (error) {
        // 如果有任何錯誤發生，輸出錯誤並返回 500 內部服務器錯誤
        console.log("❌Error protectRoute: ", error.message);
        res.status(500).json({ error: "❌Internal server error" });
    }
};

export default protectRoute;
