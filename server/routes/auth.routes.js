import express from "express";
import { signup } from "../controllers/auth/signup.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { login } from "../controllers/auth/login.controller.js"

const router = express.Router();


// PATH:  /api/auth/signup
router.post("/signup", signup);

// PATH:  /api/auth/logout
router.post("/logout", logout);

// PATH:  /api/auth/login
router.post("/login", login);



export default router;