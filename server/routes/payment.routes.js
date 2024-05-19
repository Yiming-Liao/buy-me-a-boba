import express from "express";
import { paypalCheckout, paypalCheckoutCapture } from "../controllers/payment/paypalCheckout.controller.js"
import { payout } from "../controllers/payment/payout.controller.js"


const router = express.Router();


// PATH:  /api/payment/orders    // 處理創建訂單
router.post("/orders", paypalCheckout);

// PATH:  /api/payment/orders/:orderID/capture    // 處理訂單扣款
router.post("/orders/:orderID/capture", paypalCheckoutCapture);

// PATH:  /api/payment/payout    // 處理出款
router.post("/payout", payout);



// // PATH:  /api/payment/payout
// router.post("/payout", payout);

export default router;