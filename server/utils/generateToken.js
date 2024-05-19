import jwt from "jsonwebtoken";

// 生成 token 並設置 cookie
const generateTokenAndSetCookie = (userId, res) => {
    // 使用 JWT 生成 token，內含用戶 ID 且設定 15 天後過期
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    // 將 token 存入 cookie，設置 cookie 的安全屬性
    res.cookie("jwt", token, {
        path: '/',
        maxAge: 15 * 24 * 60 * 60 * 1000,  // cookie 有效期，單位是毫秒
        httpOnly: true,   // 設置為 httpOnly，禁止 JavaScript 透過 document.cookie 訪問
        sameSite: "Strict",  // 防止 CSRF 攻擊，限制第三方網站的請求攜帶 cookie
        // sameSite: "None",  //--- for dev ---//
        secure: process.env.NODE_ENV !== "development" // 非開發環境下，只透過 HTTPS 傳送 cookie
    })
}

export default generateTokenAndSetCookie;
