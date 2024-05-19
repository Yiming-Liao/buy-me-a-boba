/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import PaypalCheckout from "../components/PublicPage/PaypalCheckout";
import { X, MessageSquareMore, CircleDollarSign, Wrench, CircleCheckBig, HandCoins, ScrollText, ShoppingBasket } from 'lucide-react';
import PublicPaymentCardList from "../components/PublicPage/PublicPaymentCardList";
import logo from "../assets/logo.png";
import { avatars } from "../assets/avatar";
import LoadingDots from "../components/LoadingDots"
import { useLoadingContext } from '../contexts/LoadingContext';

const PublicPage = () => {
    const { setIsLoadingContext } = useLoadingContext();
    const { username } = useParams(); // 取得當前網址的使用者名稱 .../username/
    const navigate = useNavigate();
    const { getUser, isLoading } = useGetUser(); // hook 呼叫後端取得頁面擁有者資料
    const [targetUser, setTargetUser] = useState({}); // 將資料賦值給 targetUser

    const [itemQuantity, setItemQuantity] = useState(1); // 數量
    const usdAmount = itemQuantity * 3;
    const [isShowPyapl, setIsShowPyapl] = useState(false); // 是否顯示 Paypal 畫面

    const [isChangeAvatar, setIsChangeAvatar] = useState(false); // 是否顯示選取 avatar 畫面
    const [selectedAvatar, setSelectedAvatar] = useState("boy1");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    // 讀取中
    useEffect(() => {
        setIsLoadingContext(isLoading);
    }, [isLoading]);

    // 檢查使用者是否存在，如不存在跳回首頁
    useEffect(() => {
        const verifyUser = async () => {
            const targetUserData = await getUser(username);
            if (!targetUserData.username) navigate('/'); // 用戶不存在時導向首頁
            setTargetUser({
                username: targetUserData?.username,
                avatar: {
                    avatarUrl: targetUserData?.avatar?.avatarUrl,
                    defaultUrl: targetUserData?.avatar?.defaultUrl,
                },
                payment: targetUserData.payment
            });
        };
        verifyUser();
    }, []);
    // 處理 Paypal 按鈕
    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemQuantity < 1) return
        window.scrollTo(0, 0);
        setIsShowPyapl(true);
    }

    // 處理手機上畫面
    const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth <= 768);
    const [isShowRecords, setIsShowRecords] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsNarrowScreen(window.innerWidth <= 768)
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
    return (
        <>
            {/* Paypal 付款按鈕 */}
            {isShowPyapl &&
                <>
                    <div className="fixed w-full h-screen top-0 bg-slate-800 opacity-90 z-10" />
                    <div className="absolute left-1/2 translate-x-[-50%] top-0 h-full w-full flex flex-col justify-center items-center z-20">
                        <div className="absolute top-[2vw] h-[1700px] w-[95vw] p-10 text-slate-700 bg-slate-100 rounded-md flex flex-col items-center gap-5">
                            <button
                                className="w-12 h-12 flex items-center self-center justify-center rounded-full my-[-8px] shadow-md bg-slate-600 hover:bg-slate-200 group"
                                onClick={() => setIsShowPyapl(false)}
                            >
                                <X className="text-white group-hover:text-slate-800" />
                            </button>
                            <PaypalCheckout itemQuantity={itemQuantity} title={title} message={message} selectedAvatar={selectedAvatar} setIsShowPyapl={setIsShowPyapl} />
                        </div>

                    </div >
                </>
            }

            {/* 更改 Avatart */}
            {isChangeAvatar &&
                <>
                    <div className="fixed w-full h-screen top-0 bg-slate-800 opacity-90 z-10" />
                    <div className="fixed left-1/2 translate-x-[-50%] top-0 h-full w-full flex flex-col justify-center items-center z-20">
                        <div className="p-10 px-3 text-slate-700 bg-slate-100 rounded-md flex flex-col justify-center gap-5">
                            <div className="flex gap-2">
                                <div className="w-20 h-20 flex justify-center items-center rounded-full">
                                    <img src={avatars.boy1} alt="avatar"
                                        className={`${selectedAvatar === "boy1" ? "w-20 border-4 border-emerald-300" : "w-16"} cursor-pointer shadow-md rounded-full`}
                                        onClick={() => setSelectedAvatar("boy1")}
                                    />
                                </div>
                                <div className="w-20 h-20 flex justify-center items-center rounded-full">
                                    <img src={avatars.boy2} alt="avatar"
                                        className={`${selectedAvatar === "boy2" ? "w-20 border-4 border-emerald-300" : "w-16"} cursor-pointer shadow-md rounded-full`}
                                        onClick={() => setSelectedAvatar("boy2")}
                                    />
                                </div>
                                <div className="w-20 h-20 flex justify-center items-center rounded-full">
                                    <img src={avatars.boy3} alt="avatar"
                                        className={`${selectedAvatar === "boy3" ? "w-20 border-4 border-emerald-300" : "w-16"} cursor-pointer shadow-md rounded-full`}
                                        onClick={() => setSelectedAvatar("boy3")}
                                    />
                                </div>
                                <div className="w-20 h-20 flex justify-center items-center rounded-full">
                                    <img src={avatars.boy4} alt="avatar"
                                        className={`${selectedAvatar === "boy4" ? "w-20 border-4 border-emerald-300" : "w-16"} cursor-pointer shadow-md rounded-full`}
                                        onClick={() => setSelectedAvatar("boy4")}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="w-20 h-20 flex justify-center items-center rounded-full">
                                    <img src={avatars.girl1} alt="avatar"
                                        className={`${selectedAvatar === "girl1" ? "w-20 border-4 border-emerald-300" : "w-16"} cursor-pointer shadow-md rounded-full`}
                                        onClick={() => setSelectedAvatar("girl1")}
                                    />
                                </div>
                                <div className="w-20 h-20 flex justify-center items-center rounded-full">
                                    <img src={avatars.girl2} alt="avatar"
                                        className={`${selectedAvatar === "girl2" ? "w-20 border-4 border-emerald-300" : "w-16"} cursor-pointer shadow-md rounded-full`}
                                        onClick={() => setSelectedAvatar("girl2")}
                                    />
                                </div>
                                <div className="w-20 h-20 flex justify-center items-center rounded-full">
                                    <img src={avatars.girl3} alt="avatar"
                                        className={`${selectedAvatar === "girl3" ? "w-20 border-4 border-emerald-300" : "w-16"} cursor-pointer shadow-md rounded-full`}
                                        onClick={() => setSelectedAvatar("girl3")}
                                    />
                                </div>
                                <div className="w-20 h-20 flex justify-center items-center rounded-full">
                                    <img src={avatars.girl4} alt="avatar"
                                        className={`${selectedAvatar === "girl4" ? "w-20 border-4 border-emerald-300" : "w-16"} cursor-pointer shadow-md rounded-full`}
                                        onClick={() => setSelectedAvatar("girl4")}
                                    />
                                </div>
                            </div>

                        </div>
                        <button
                            className="w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-slate-600 m-6 hover:bg-slate-200 group"
                            onClick={() => setIsChangeAvatar(false)}
                        >
                            <CircleCheckBig className="text-white group-hover:text-slate-800" />
                        </button>
                    </div >
                </>
            }

            {/* Switch for Phone */}
            {isNarrowScreen &&
                <div className="flex justify-center items-center mx-auto gap-12 m-2 text-slate-500">
                    <button
                        className="w-24 flex justify-center items-center rounded-full shadow-md h-12 active:bg-slate-200"
                        onClick={() => setIsShowRecords(false)}
                    >
                        <ShoppingBasket />
                    </button>
                    <button
                        className="w-24 flex justify-center items-center rounded-full shadow-md h-12 active:bg-slate-200"
                        onClick={() => setIsShowRecords(true)}
                    >
                        <ScrollText />
                    </button>
                </div>
            }

            {/* MAIN */}
            <div className="flex justify-center gap-10">
                {/* 購買 SECTION 左側 */}
                <div className={`flex flex-col justify-start w-[800px] max-md:items-center items-end  ${isNarrowScreen && isShowRecords ? "hidden" : ""}`}>
                    <div className='flex flex-col justify-center items-center'>
                        <div className="flex w-96 max-md:w-80 justify-center items-center gap-2 mb-6 py-4 px-12 rounded-xl shadow-lg">
                            <h1 className="text-2xl text-slate-600">Buy Me a Boba</h1>
                            <img src={logo} alt="boba tea" className="w-10 max-md:w-8 mb-1" />
                        </div>
                        <div className='w-96 max-md:w-80 h-40 flex flex-col justify-center items-center'>

                            <img
                                src={targetUser?.avatar?.avatarUrl === "" ? targetUser?.avatar?.defaultUrl : targetUser?.avatar?.avatarUrl || ""}
                                alt="avatar"
                                className={`w-24 h-24 shadow-lg rounded-full ${!isAvatarLoaded ? "hidden" : ""}`}
                                onLoad={() => setIsAvatarLoaded(true)}
                                onError={() => setIsAvatarLoaded(false)}
                            />
                            {!isAvatarLoaded &&
                                <div className="scale-50 w-[42px] h-12 my-10">
                                    <LoadingDots />
                                </div>
                            }

                            {!isLoading ? (
                                <h1 className="text-3xl text-slate-600 m-2 mt-4">
                                    {targetUser.username}
                                </h1>
                            ) : (
                                <div className="scale-50 w-[42px] mb-5">
                                    <LoadingDots />
                                </div>
                            )}

                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center m-6">
                            {/* 買幾杯 */}
                            <div className="w-96 max-md:w-80 flex flex-col items-center text-xl border-t-4 border-gray-50 p-5 pt-0 text-slate-500 shadow-xl justify-center rounded-3xl hover:bg-[rgba(250,250,250,100)]">
                                <div className="relative -top-[22px] right-32 w-10 h-10 flex justify-center items-center rounded-full bg-white shadow-md">
                                    <HandCoins className="text-slate-300 hover:text-slate-500" />
                                </div>
                                <div className="flex gap-3 items-center">
                                    <label htmlFor="itemQuantity">我 要 買</label>
                                    <input
                                        id="itemQuantity"
                                        type="number"
                                        min={1}
                                        value={itemQuantity}
                                        onChange={e => setItemQuantity(e.target.value)}
                                        disabled={isShowPyapl}
                                        className="h-8 w-24 rounded-full px-4 text-center text-slate-600 mb-1 border-2"
                                    />
                                    <label htmlFor="itemQuantity">杯</label>
                                </div>

                                <div className="text-slate-400 mt-2 ml-10">
                                    <a className="flex items-center gap-1 hover:text-yellow-600" href="https://www.google.com/finance/quote/USD-TWD?sa=X&sqi=2&ved=2ahUKEwjt3N6tipGGAxVSZvUHHUfyAcYQmY0JegQIFRAw" target="_blank" rel="noreferrer">
                                        <CircleDollarSign className="scale-75" />
                                        <div> {usdAmount} <span className="text-xs">USD</span></div>
                                    </a>
                                </div>
                            </div>

                            {/* 訊息 Card */}
                            <div className="w-96 max-md:w-80  min-h-48 flex flex-col items-center rounded-xl shadow-md p-2 pt-0 pb-4 border-2 border-slate-100 mt-8 mb-3 relative bg-slate-200">
                                <div className="relative -top-5 right-32 w-10 h-10 flex justify-center items-center rounded-full bg-white shadow-md">
                                    <MessageSquareMore className="text-slate-300 hover:text-slate-500" />
                                </div>

                                <div className="w-4/5 px-3 mb-4 min-h-20 flex items-center rounded-full shadow-md bg-white hover:bg-[rgba(250,250,250,100)]">
                                    <div className="group">
                                        <Wrench className="text-slate-400 bg-white w-8 h-8 p-1 absolute top-[90px] left-10 rounded-full shadow-md cursor-pointer group-hover:-rotate-45"
                                            onClick={() => setIsChangeAvatar(true)}
                                        />
                                        <img src={avatars[selectedAvatar]} alt="avatar"
                                            className="w-16 cursor-pointer  group-hover:border-slate-300 group-hover:border-2 rounded-full"
                                            onClick={() => setIsChangeAvatar(true)}
                                        />
                                    </div>
                                    <input type="text" placeholder="名 稱"
                                        className="text-xl w-32 h-10 m-4 text-center text-slate-600 border-2 border-slate-100 rounded-xl"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                                <textarea
                                    className="w-72 max-md:w-64 min-h-[80px] h-48 p-3 my-auto border-4 border-slate-100 rounded-2xl text-slate-600 bg-white"
                                    placeholder="寫下任何訊息 . ."
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                ></textarea>
                            </div>

                            <button type="submit"
                                className="w-20 h-12 rounded-full shadow-md text-slate-600 hover:bg-slate-200"
                            >
                                購 買
                            </button>
                        </form>
                    </div>
                </div>

                {/* CARD SECTION 右側 */}
                <div className={` flex flex-col items-center ${isNarrowScreen && !isShowRecords ? "hidden" : ""}`}>
                    <div className={`${isNarrowScreen ? "hidden" : ""} w-36 h-16 flex justify-center items-center rounded-full shadow-md mt-20 text-slate-600`}>
                        <ScrollText />
                    </div>
                    {targetUser?.payment?.length === 0 ? (
                        <div className='flex justify-center items-center text-slate-400 m-6 w-72'>
                            尚未收到
                            <img src={logo} alt="logo" className='w-5 mb-1' />
                        </div>
                    ) : (
                        <div className='min-w-96'>
                            <PublicPaymentCardList updatedData={targetUser.payment} username={username} />
                        </div>
                    )}
                </div>
            </div>

            <div className="min-h-80" />
        </>



    )
}
export default PublicPage