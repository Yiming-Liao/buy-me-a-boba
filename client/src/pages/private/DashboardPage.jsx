/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import useGetUserPrivate from "../../hooks/useGetUserPrivate";

import { LayoutDashboard, Coins, RotateCw, PiggyBank } from 'lucide-react';
import PaymentCard from "../../components/Dashboard/PaymentCard";

import { X } from "lucide-react";
import usePayout from "../../hooks/usePayout";
import LoadingDots from "../../components/LoadingDots"
import { useLoadingContext } from '../../contexts/LoadingContext';
import toast from "react-hot-toast";

const Dashboard = () => {
    const { authUser } = useAuthContext();
    const { username } = useParams();
    const navigate = useNavigate();
    const { getUserPrivate, isLoading } = useGetUserPrivate();
    const [updatedData, setUpdatedData] = useState({});
    const { setIsLoadingContext } = useLoadingContext();

    // 讀取中
    useEffect(() => {
        setIsLoadingContext(isLoading);
    }, [isLoading])

    useEffect(() => {
        if (username !== authUser.username) return navigate("/");
        const fetchData = async () => setUpdatedData(await getUserPrivate(authUser._id));
        fetchData();
    }, []);

    const [payoutTotal, setPayoutTotal] = useState(20)
    const [isShowPayout, setIsShowPayout] = useState(false);
    const [isShowConfirmPayout, setIsShowConfirmPayout] = useState(false);
    const { payout } = usePayout();

    // 提領餘額 Payout
    const handlePayout = () => {
        if (payoutTotal < 20) return toast(`金額小於20`, { duration: 1500, icon: ' ❌ ' })
        if (updatedData.totalAmount.toFixed(2) < 20) return toast(`您的餘額小於20`, { duration: 1500, icon: ' 😥 ' });
        payout(username, payoutTotal);
        setIsShowPayout(false);
        setIsShowConfirmPayout(false);
    }
    return (
        <>
            {isShowPayout &&
                <>
                    <div className="fixed w-full h-screen top-0 bg-slate-800 opacity-90 z-10" />
                    <div className="absolute left-1/2 translate-x-[-50%] top-20 h-full w-full flex flex-col items-center z-10">
                        <div className="absolute top-[2vw] h-[560px] w-[360px] p-10 text-slate-700 bg-slate-100 rounded-md flex flex-col items-center gap-5">

                            <button
                                className="mb-6 w-12 h-12 flex items-center self-center justify-center rounded-full my-[-8px] shadow-md bg-slate-600 hover:bg-slate-200 group"
                                onClick={() => { setIsShowPayout(false); setIsShowConfirmPayout(false) }}
                            >
                                <X className="text-white group-hover:text-slate-800" />
                            </button>
                            <div className="text-sm text-nowrap overflow-x-auto flex justify-center items-center w-64 h-16 gap-2 mb-6 py-4 px-4 rounded-full shadow-lg text-slate-600 bg-white">
                                <div>
                                    <Coins />
                                </div>
                                <span>我的總資產</span>
                                <span>$</span>
                                {updatedData.payment ? (
                                    <span className="text-xl -mt-1">
                                        {updatedData.totalAmount.toFixed(2)}
                                    </span>
                                ) : (
                                    <div className="scale-50 w-[42px]">
                                        <LoadingDots />
                                    </div>
                                )
                                }
                                <span>USD</span>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="flex flex-col justify-center items-start gap-1">
                                    <label htmlFor="amount" className="ml-3">您要提領的金額</label>
                                    <span className="text-xs text-slate-500 ml-3 mb-1">最低為 $20</span>
                                </div>
                                <input
                                    id="amount"
                                    type="number"
                                    min={20}
                                    disabled={isShowConfirmPayout}
                                    value={payoutTotal}
                                    onChange={e => setPayoutTotal(e.target.value)}
                                    className={`h-8 shadow-md rounded-full px-4 text-lg w-60 text-center`}
                                />
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <div className="flex flex-col justify-center items-start gap-1">
                                    <label htmlFor="amount" className="ml-3">請確認您的 Email</label>
                                    <span className="text-xs text-slate-500 ml-3 mb-1">本平台將撥款至您的Paypal帳號，請確認<br />是否為您的Paypal帳號所使用的Email</span>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    defaultValue={authUser.email}
                                    disabled={true}
                                    className={`h-8 shadow-md rounded-full px-4 text-sm w-60`}
                                />
                            </div>

                            {!isShowConfirmPayout &&
                                <button
                                    className="w-20 h-12 flex items-center justify-center rounded-full shadow-md bg-white mt-3"
                                    onClick={() => {
                                        if (payoutTotal < 20) return toast(`金額小於20`, { duration: 1500, icon: ' ❌ ' });
                                        if (updatedData.totalAmount.toFixed(2) < 20) return toast(`您的餘額小於20`, { duration: 1500, icon: ' 😥 ' });
                                        setIsShowConfirmPayout(true)
                                    }}
                                >
                                    提領
                                </button>
                            }

                            {isShowConfirmPayout &&
                                <div className="flex justify-self-center items-center gap-10">
                                    <button
                                        className="w-20 h-12 flex items-center justify-center rounded-full shadow-md bg-green-300 mt-3"
                                        onClick={handlePayout}
                                    >
                                        確認
                                    </button>
                                    <button
                                        className="w-20 h-12 flex items-center justify-center rounded-full shadow-md bg-red-300 mt-3"
                                        onClick={() => { setIsShowConfirmPayout(false) }}
                                    >
                                        取消
                                    </button>
                                </div>
                            }
                        </div>
                    </div >
                </>
            }


            <div className="flex flex-col items-center relative">

                <div className="text-lg flex items-center gap-2 rounded-3xl shadow-md p-2 px-3 mb-6 text-slate-600">
                    <LayoutDashboard />
                    我的主控版
                </div>

                <a href={`/${authUser.username}`} target="_blank" rel="noreferrer"
                    className="text-sky-600 flex items-center text-sm absolute top-[6px] translate-x-[168%] rounded-md shadow-md p-[6px] hover:bg-slate-100"
                >
                    Boba頁面
                </a>

                <button className="text-sky-600 flex items-center text-sm absolute top-[6px] translate-x-[-320%] rounded-full scale-90 shadow-md p-[6px] hover:scale-90 hover:bg-slate-100"
                    onClick={() => window.location.reload()}
                >
                    <RotateCw />
                </button>

                <button target="_blank" rel="noreferrer"
                    className="text-sky-600 flex items-center text-sm absolute top-[154px] translate-x-[-120%] rounded-full scale-90 shadow-md p-[8px] hover:scale-100"
                    onClick={() => navigate(`/${authUser.username}/dashboard/payoutrecord`)}
                >
                    <PiggyBank className="scale-75" />提領紀錄
                </button>

                {/* 我的總資產 */}
                <div className="text-nowrap overflow-x-auto flex justify-center items-center w-80 h-16 gap-2 mb-6 py-4 px-6 rounded-xl shadow-lg text-slate-600">
                    <div>
                        <Coins />
                    </div>
                    <span>我的總資產</span>
                    <span>$</span>
                    {updatedData.payment ? (
                        <span className="text-xl -mt-1">
                            {updatedData.totalAmount.toFixed(2)}
                        </span>
                    ) : (
                        <div className="scale-50 w-[42px]">
                            <LoadingDots />
                        </div>
                    )
                    }
                    <span>USD</span>
                </div>

                <div>
                    <button className="btn-grad2 px-4 py-2"
                        onClick={() => setIsShowPayout(true)}
                    >
                        提領餘額
                    </button>
                </div>

                {/* CARD */}
                <div className="flex flex-wrap justify-center">
                    {updatedData.payment &&
                        <>
                            {updatedData.payment.slice().reverse().map((eachPayment) => (
                                <PaymentCard eachPayment={eachPayment} key={eachPayment._id} />
                            ))}
                        </>
                    }
                </div>
                <div className="m-20" />
            </div >
        </>
    )
}

export default Dashboard;
