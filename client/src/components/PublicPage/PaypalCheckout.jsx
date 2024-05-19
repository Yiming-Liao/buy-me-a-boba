import { useEffect, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import logo from "../../assets/logo.png"

function PaypalCheckout({ itemQuantity, title, message, selectedAvatar, setIsShowPyapl }) {
    const initialOptions = {
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        "enable-funding": "paylater,venmo",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };
    const { username } = useParams();

    const itemQuantityRef = useRef(itemQuantity);
    useEffect(() => {
        itemQuantityRef.current = itemQuantity;  // 更新 ref 的當前值
    }, [itemQuantity]);

    return (
        <>
            <div className="flex flex-col justify-center items-center text-slate-500 w-[350px]">
                <h1 className="text-xl my-2">請等待Paypal付款按鈕出現</h1>
                <div className=" flex justify-center items-center">
                    <img src={logo} alt="logo" className="w-6 mb-1" />
                    <h3 className="m-3 tracking-widest">杯數: <span className="text-lg text-slate-700">{itemQuantity}</span></h3>
                </div>
                <h3 className="mb-6 tracking-widest">金額: <span className="text-lg text-slate-700">{itemQuantity * 5}</span> <span className="text-xs tracking-wide">USD</span></h3>
                <div className="h-28 w-[90%]">
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{
                                shape: "rect",//color:'blue' change the default color of the buttons
                                layout: "vertical", //default value. Can be changed to horizontal
                            }}
                            createOrder={async () => {
                                try {
                                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/orders`, {
                                        method: "POST",
                                        credentials: 'include',
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            quantity: itemQuantityRef.current,
                                        }),
                                    });
                                    const orderData = await response.json();
                                    if (orderData.id) {
                                        return orderData.id;
                                    } else {
                                        const errorDetail = orderData?.details?.[0];
                                        const errorMessage = errorDetail
                                            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                            : JSON.stringify(orderData);
                                        throw new Error(errorMessage);
                                    }
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                            onApprove={async (data, /*actions*/) => {
                                try {
                                    const response = await fetch(
                                        `${process.env.REACT_APP_API_URL}/api/payment/orders/${data.orderID}/capture`,
                                        {
                                            method: "POST",
                                            credentials: 'include',
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                username: username,
                                                quantity: itemQuantityRef.current,
                                                title: title,
                                                message: message,
                                                selectedAvatar: selectedAvatar
                                            }),
                                        },
                                    );

                                    const dataBack = await response.json();
                                    console.log(dataBack);
                                    setIsShowPyapl(false);
                                    window.location.reload();
                                    // const orderData = await response.json();
                                    // // Three cases to handle:
                                    // //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                    // //   (2) Other non-recoverable errors -> Show a failure message
                                    // //   (3) Successful transaction -> Show confirmation or thank you message

                                    // const errorDetail = orderData?.details?.[0];

                                    // if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                    //     // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                    //     // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                    //     return actions.restart();
                                    // } else if (errorDetail) {
                                    //     // (2) Other non-recoverable errors -> Show a failure message
                                    //     throw new Error(
                                    //         `${errorDetail.description} (${orderData.debug_id})`,
                                    //     );
                                    // } else {
                                    //     // (3) Successful transaction -> Show confirmation or thank you message
                                    //     // Or go to another URL:  actions.redirect('thank_you.html');
                                    //     const transaction =
                                    //         orderData.purchase_units[0].payments.captures[0];
                                    //     setMessage(
                                    //         `付款狀態: ${transaction.status}，付款ID: ${transaction.id}Z`,
                                    //     );
                                    //     console.log(
                                    //         "Capture result",
                                    //         orderData,
                                    //         JSON.stringify(orderData, null, 2),
                                    //     );
                                    // }
                                } catch (error) {
                                    console.error(error);
                                    toast(`未知的錯誤`, { duration: 3000, icon: ' ❌ ' });
                                }
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
            </div>
        </>
    );
}

export default PaypalCheckout;
