import { useState } from "react";
import formatTime from "../../utils/formatTime"
import { Info, X, HandCoins } from "lucide-react";
import { avatars } from "../../assets/avatar"
import logo from "../../assets/logo.png"

const PaymentCard = ({ eachPayment, isPublic, username }) => {
    const [isShowDetail, setIsShowDetail] = useState(false)
    return (
        <>
            {isShowDetail && !isPublic &&
                <>
                    <div className="fixed w-full h-screen top-0 bg-slate-800 opacity-90 z-10" />
                    <div className="absolute left-1/2 translate-x-[-50%] top-10 h-full w-full flex flex-col items-center z-10">
                        <div className="absolute top-[2vw] h-[420px] w-[360px] p-10 text-slate-700 bg-slate-100 rounded-md flex flex-col items-center gap-5">
                            <button
                                className="mb-6 w-12 h-12 flex items-center self-center justify-center rounded-full my-[-8px] shadow-md bg-slate-600 hover:bg-slate-200 group"
                                onClick={() => setIsShowDetail(false)}
                            >
                                <X className="text-white group-hover:text-slate-800" />
                            </button>

                            <div className="h-fit w-fit text-slate-700 bg-slate-100 rounded-md flex flex-col items-center gap-5">
                                <HandCoins className="mx-auto mb-2" />
                                <div><span className="text-slate-500">總金額: </span>{eachPayment.money.grossAmount.toFixed(2)} <span className="text-xs text-slate-400">USD</span></div>
                                <div><span className="text-slate-500">Paypal手續費: </span>{eachPayment.money.paypalFee.toFixed(2)} <span className="text-xs text-slate-400">USD</span></div>
                                <div><span className="text-slate-500">平台手續費: </span>{eachPayment.money.commissionForPlatform.toFixed(2)} <span className="text-xs text-slate-400">USD</span></div>
                                <div className="scale-110 mt-3 p-3 rounded-full shadow-md"><span className="text-slate-500">收到總金額: </span>{eachPayment.money.receiveUserGet.toFixed(2)} <span className="text-xs text-slate-400">USD</span></div>
                            </div>
                        </div>
                    </div >
                </>
            }
            < div className="flex flex-col items-center m-6" >
                <div className="w-80 min-h-48 flex flex-col items-center rounded-xl shadow-md bg-slate-100 pb-3">
                    <div className="text-xs text-slate-400 self-end my-2 mr-3">
                        {formatTime(eachPayment.createdAt)}
                    </div>
                    <div className="w-4/5 px-3 mb-3 min-h-20 flex items-center rounded-full shadow-md bg-white">
                        <img src={avatars[eachPayment.selectedAvatar]} alt="avatar"
                            className="w-16"
                        />
                        <div className="text-2xl flex-1 text-center text-slate-600 mx-1 py-2 pr-2 overflow-x-auto text-nowrap">{eachPayment.title}</div>
                    </div>
                    <div className={`m-1 text-slate-500 my-2 flex ${isPublic ? "justify-start" : "justify-center"} items-center tracking-wider w-72 h-12 pl-3 pr-2 overflow-x-auto text-nowrap`}>
                        買了 <span className="text-xl mx-1 mb-[2px]">{eachPayment.quantity}</span> 杯<img src={logo} alt="logo" className="w-5 mb-1 mx-1" />{isPublic ? `給 ${username}` : "給您"}
                    </div>
                    <div className="w-72 max-h-80 my-auto flex flex-col items-center rounded-xl shadow-md bg-white mb-3">
                        <div className="min-h-[60px] p-3 flex justify-center items-center text-slate-600">
                            {eachPayment.message}
                        </div>
                    </div>
                    {!isPublic &&
                        <div className="m-auto text-slate-500 flex items-center justify-center gap-1 cursor-pointer"
                            onClick={() => setIsShowDetail(true)}
                        >
                            收到總金額: {eachPayment.money.receiveUserGet.toFixed(2)}
                            <Info className={`scale-[75%] mb-[2px] ${isShowDetail ? "opacity-0" : ""}`} />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default PaymentCard