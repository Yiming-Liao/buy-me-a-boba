import dotenv from "dotenv";
dotenv.config();

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
// const base = "https://api-m.sandbox.paypal.com";
const base = "https://api-m.paypal.com";

import User from "../../models/user.model.js";
import Payment from "../../models/payment.model.js"
import { incReceiveUserGet } from "../../utils/db/incReceiveUserGet.js"

// paypalCheckout // 1.創建訂單 {createOrder}
export const paypalCheckout = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { jsonResponse, httpStatusCode } = await createOrder(quantity);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
}


// paypalCheckoutCapture  // 2.檢查扣款成功與否，並處理後續 {onApprove}
export const paypalCheckoutCapture = async (req, res) => {

    try {
        const { orderID } = req.params;
        console.log(`orderID: `, orderID);
        const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

        const { username, quantity, title, message, selectedAvatar } = req.body;
        // 確認付款是否成功
        if (httpStatusCode === 201) { // 根據 PayPal API, 狀態碼 201 表示付款成功
            const paymentDetails = jsonResponse;
            // 用 username 在 mongoDB 裡面找到 receiveUser
            const receiveUser = await User.findOne({ username: username });
            if (!receiveUser) res.status(400).json({ error: "find no user" });
            // 獲取付款細節
            const grossAmount = paymentDetails.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value;
            const netAmount = paymentDetails.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value;
            const paypalFee = paymentDetails.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value;
            const commissionForPlatform = Number(grossAmount) * 0.01;
            const receiveUserGet = (Number(netAmount) - commissionForPlatform);

            // 將資訊整理成 paymentData (for Model)
            const paymentData = {
                receiveUser: receiveUser._id,
                quantity: quantity,
                money: {
                    grossAmount: grossAmount,
                    netAmount: netAmount,
                    paypalFee: paypalFee,
                    commissionForPlatform: commissionForPlatform,
                    receiveUserGet: receiveUserGet
                },
                message: message,
                title: title,
                selectedAvatar: selectedAvatar
            };
            // 儲存到 Payment (Model)
            const newPayment = new Payment(paymentData);
            const savedPayment = await newPayment.save();

            // 增加接收者 (Model) 的 totalAmount
            incReceiveUserGet(paymentData);

            // 將Payment _id 儲存到接收的 User (Model)
            const updatedUser = await User.findByIdAndUpdate(
                receiveUser._id,
                { $push: { payment: savedPayment._id } },
                { new: false } // 不需要在這步返回更新後的文檔，因為會在下一步填充
            );

            // 回應客戶端
            res.status(httpStatusCode).json({
                success: true,
                message: "Payment captured and recorded successfully",
                updatedUser: updatedUser,
                paymentInfo: savedPayment
            });
        } else {
            throw new Error('Payment capture failed with status code: ' + httpStatusCode);
        }
    } catch (error) {
        console.error("Failed to capture order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
}



//// Functions ////

// 創建一個 PayPal 支付訂單，處理前端傳過來的 ( cart )
/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
*/
async function createOrder(quantity) {
    // 計算總價
    const allValue = (Number(quantity) * 3).toString();
    // const allValue = (Number(quantity) * 1).toString(); //---for dev---//
    console.log(`總數: ${quantity} 個 ,   總金額: ${allValue} USD`);
    // 認證token
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    // 交易之商品與價格
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: allValue,
                },
            },
        ],
    };

    // POST 到 Paypal 處理
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
    });
    console.log("createOrder...")
    return handleResponse(response);
};

// 處理訂單的扣款（capture）操作
/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
*/
async function captureOrder(orderID) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return handleResponse(response);
};

// 處理回應
async function handleResponse(response) {
    try {
        const jsonResponse = await response.json();
        return {
            jsonResponse,
            httpStatusCode: response.status,
        };
    } catch (err) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

// 認證 token
/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
async function generateAccessToken() {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
        ).toString("base64");
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};





/////////////////////////////////////////////////////////////////////////////////
// export const paypalCheckoutCapture = async (req, res) => {
//     try {
//         const { orderID } = req.params;
//         const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

//         res.status(httpStatusCode).json(jsonResponse);
//     } catch (error) {
//         console.error("Failed to create order:", error);
//         res.status(500).json({ error: "Failed to capture order." });
//     }
// }
