/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext"
import useUpdateUserData from "../../hooks/useUpdateUserData"

import UpdateAvatar from "../../components/SettingPage/UpdateAvatar"

import { Pencil, Check, X, CircleUserRound, Copy } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom"
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { useLoadingContext } from "../../contexts/LoadingContext";

const SettingPage = () => {
    const { authUser } = useAuthContext();
    const { username } = useParams();
    const navigate = useNavigate();
    const { updateUserData, isLoading } = useUpdateUserData();
    const [userData, setUserData] = useState({
        username: authUser.username, email: authUser.email
    });
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        if (username !== authUser.username) navigate("/");
    }, [])


    const handleConfirm = () => {
        setIsEditing(false);
        updateUserData(userData.username, userData.email)
            .then(done => {
                if (done) return navigate(`/${userData.username}/setting`) // 成功
                setUserData({ username: authUser.username, email: authUser.email }); // 失敗
            });
    }

    const handleCancel = () => {
        setIsEditing(false);
        setUserData({ username: authUser.username, email: authUser.email });
    }

    const { setIsLoadingContext } = useLoadingContext();
    // 讀取中
    useEffect(() => {
        setIsLoadingContext(isLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps, no-use-before-define
    }, [isLoading])


    return (
        <div>

            {isEditingAvatar && <UpdateAvatar setIsEditingAvatar={setIsEditingAvatar} />}

            <div className="flex flex-col justify-center] items-center text-slate-600">

                <div className="text-lg flex items-center gap-2 rounded-3xl shadow-md p-2 px-3 mb-6">
                    <CircleUserRound />
                    用戶設定
                </div>

                <div className="rounded-full m-6 mb-12 shadow-md">
                    <img
                        src={authUser?.avatar?.avatarUrl === "" ? authUser?.avatar?.defaultUrl : authUser?.avatar?.avatarUrl || ""}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="absolute top-[165px] scale-75 left-[calc(50vw+35px)]">
                        {!isEditingAvatar &&
                            <button type="submit"
                                className="w-12 h-12 flex items-center justify-center rounded-full shadow-md"
                                onClick={() => setIsEditingAvatar(true)}
                            >
                                <Pencil />
                            </button>
                        }
                    </div>

                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start gap-3">
                        <label htmlFor="username" className="ml-3">使用者名稱</label>
                        <input
                            id="username"
                            type="text"
                            value={userData.username}
                            onChange={e => setUserData(prev => ({ ...prev, username: e.target.value }))}
                            disabled={!isEditing}
                            className={`w-60 h-8 shadow-md rounded-full px-4 ${isEditingAvatar ? "opacity-[5%]" : ""} ${isEditing ? "" : "bg-slate-100"}`}

                        />
                    </div>

                    <div className="flex flex-col items-start gap-1 my-2">
                        <label htmlFor="username" className="ml-3 text-xs">您的公開網址</label>
                        <div className="relative">
                            <img src={logo} alt="logo" className={`w-5 absolute top-[5px] left-4  ${isEditingAvatar ? "opacity-[5%]" : ""}`} />
                            <input
                                id="username"
                                type="text"
                                value={`	 / ${authUser.username}`}
                                onChange={e => setUserData(prev => ({ ...prev, username: e.target.value }))}
                                disabled={true}
                                className={`pl-6 w-60 text-sm h-8 shadow-md rounded-full px-4 ${isEditingAvatar ? "opacity-[5%]" : ""} bg-slate-50`}

                            />
                            <button className={`absolute top-[4px] right-3 w-24 h-6 rounded-full text-slate-500 bg-white shadow-sm flex justify-center items-center hover:scale-100 active:scale-90  ${isEditingAvatar ? "opacity-[5%]" : ""}`}
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://buy-me-a-boba.fly.dev/${authUser.username}`);
                                    toast(`網址已複製`, { duration: 1500, icon: ' ✅ ' })
                                }}
                            >
                                <div className="text-sm">
                                    點擊複製
                                </div>
                                <Copy className="scale-[65%]" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-3">
                        <label htmlFor="username" className="ml-3">Email</label>
                        <input
                            id="username"
                            type="email"
                            value={userData.email}
                            onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                            className={`w-60 h-8 shadow-md rounded-full px-4 ${isEditingAvatar ? "opacity-[5%]" : ""} ${isEditing ? "" : "bg-slate-100"}`}
                        />
                    </div>
                </div>

                {!isEditing &&
                    <button type="submit"
                        className="w-20 h-12 flex items-center justify-center rounded-full shadow-md absolute bottom-64"
                        onClick={() => setIsEditing(true)}
                        disabled={isEditingAvatar}
                    >
                        <Pencil className="" />
                    </button>
                }

                {isEditing &&
                    <div className="flex gap-8 absolute bottom-64">
                        <button type="submit"
                            className="w-20 h-12 flex items-center justify-center rounded-full shadow-md bg-green-400"
                            onClick={handleConfirm}
                        >
                            <Check className="text-white" />
                        </button>
                        <button type="submit"
                            className="w-20 h-12 flex items-center justify-center rounded-full shadow-md bg-red-400"
                            onClick={handleCancel}
                        >
                            <X className="text-white" />
                        </button>
                    </div>
                }
            </div>
            <div className="min-h-96"></div>
        </div>
    )
}
export default SettingPage