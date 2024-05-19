import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./database/connectToMongoDB.js";

const app = express();
const PORT = 3000;
// const PORT = 5000; //--- for dev ---//

// 獲取當前文件的目錄名稱
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(cors({     //--- for dev ---//
//     origin: process.env.CLIENT_URL,  // 明確指定允許的來源
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     credentials: true  // 允許發送 cookies
// }))


// 提供靜態文件服務
const clientBuildPath = path.join(__dirname, 'build');
app.use(express.static(clientBuildPath));

// 身分驗證 authentication
app.use("/api/auth", authRoutes);

// 使用者 user
app.use("/api/user", userRoutes);

// 金流 payment
app.use("/api/payment", paymentRoutes);

// 處理所有其他路由，返回 React 應用的 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    connectToMongoDB();
    console.log(`🌍 Server is running on port ${PORT}`);
});
