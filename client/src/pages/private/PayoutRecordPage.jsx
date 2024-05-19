/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { PiggyBank, RotateCw } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import PayoutCard from "../../components/PayoutCard";
import useGetPayout from "../../hooks/useGetPayout";
import { useLoadingContext } from '../../contexts/LoadingContext';

const PayoutRecordPage = () => {
    const { authUser } = useAuthContext();
    const { username } = useParams();
    const navigate = useNavigate();
    const [payoutData, setPayoutData] = useState([])
    const { getPayout, isLoading } = useGetPayout();

    const { setIsLoadingContext } = useLoadingContext();

    // 讀取中
    useEffect(() => {
        setIsLoadingContext(isLoading);
    }, [isLoading])

    useEffect(() => {
        if (username !== authUser.username) return navigate("/");
        const fetchData = async () => setPayoutData(await getPayout(authUser._id));
        fetchData();
    }, []);
    return (
        <>
            <div className="flex flex-col items-center relative">

                <div className="w-44 text-lg flex justify-center items-center gap-2 rounded-3xl shadow-md p-2 px-3 mb-6 text-slate-600">
                    <PiggyBank />
                    我的提領紀錄
                </div>

                <button className="text-sky-600 flex items-center text-sm absolute top-[6px] translate-x-[-320%] rounded-full scale-90 shadow-md p-[6px] hover:scale-90 hover:bg-slate-100"
                    onClick={() => window.location.reload()}
                >
                    <RotateCw />
                </button>

                {/* CARD */}
                {payoutData &&
                    <>
                        {payoutData.slice().reverse().map((data) => (
                            <PayoutCard payoutData={data} key={data.createdAt} />
                        ))}
                    </>
                }
                <div className="m-20" />
            </div >
        </>
    )
}
export default PayoutRecordPage