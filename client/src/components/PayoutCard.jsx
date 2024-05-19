import logo from "../assets/logo.png";
import formatTime from "../utils/formatTime";
import { Receipt } from 'lucide-react';


const PayoutCard = ({ payoutData }) => {
    return (
        <>
            < div className="flex flex-col items-center m-6" >
                <div className="w-80 min-h-48 flex flex-col items-center rounded-xl shadow-md bg-slate-100 pb-3">
                    <div className="text-xs text-slate-400 self-end m-5">
                        {formatTime(payoutData.createdAt)}
                    </div>
                    <div className="w-4/5 px-3 pt-1 mb-3 min-h-20 flex items-center justify-center rounded-full shadow-md bg-white gap-3">
                        <Receipt className="text-slate-600 mb-1" />
                        <div className="text-slate-600">您已提領</div>
                        <div className="text-2xl text-center text-slate-600 mb-1">
                            {payoutData.payoutTotal}
                        </div>
                        <div className="text-slate-600">USD</div>
                    </div>
                    <div className="m-1 text-slate-500 my-2 flex justify-center items-center tracking-wider">

                    </div>
                    <div className="w-72 max-h-80 my-auto flex flex-col items-center rounded-xl shadow-md bg-white mb-3">
                        <div className="min-h-[60px] p-3 flex flex-col justify-center items-center gap-1 text-slate-600">
                            <div>約 3-5 個工作日將完成匯款</div>
                            <div className="flex justify-center items-center">
                                <div>感謝您使用 Buy me a Boba</div>
                                <img src={logo} alt="logo" className="w-6 mb-1" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PayoutCard