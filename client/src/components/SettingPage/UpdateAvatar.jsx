/* eslint-disable no-restricted-globals */
import { useEffect, useRef, useState } from "react";
import useUpdateAvatar from "../../hooks/useUpdateAvatar";
import { useAuthContext } from "../../contexts/AuthContext";

import useDeleteAvatar from "../../hooks/useDeleteAvatar";
import { Check, X } from 'lucide-react';
import { useLoadingContext } from '../../contexts/LoadingContext';

const UpdateAvatar = ({ setIsEditingAvatar }) => {
    const { authUser } = useAuthContext();
    const { updateAvatar } = useUpdateAvatar();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // 增加一個狀態來儲存圖片的 URL

    const { deleteAvatar, isLoading } = useDeleteAvatar();
    const handleDeleteAvatar = async () => {
        const yes = confirm("⚠️ 確定刪除嗎？");
        if (yes) deleteAvatar();
        setIsEditingAvatar(false);
    }

    // 處理文件選擇事件
    const handleFileSelect = event => {
        const file = event.target.files[0]; // 取得選擇的第一個文件
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // 為選擇的文件生成 URL
        }
    };

    // 當用戶點擊上傳按鈕時調用
    const handleUpload = () => {
        if (selectedFile) {
            updateAvatar(selectedFile, authUser._id);
        } else {
            console.log("No file selected!");
        }
        setIsEditingAvatar(false);
    };

    const { setIsLoadingContext } = useLoadingContext();
    // 讀取中
    useEffect(() => {
        setIsLoadingContext(isLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps, no-use-before-define
    }, [isLoading])

    // 隱藏 input 也能被點選到
    const inputRef = useRef(null);
    const handleInputClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <>
            <div className="absolute w-full h-full top-0 bg-slate-800 opacity-90 z-0" />
            <div className="absolute left-1/2 translate-x-[-50%] top-0 h-full w-full flex flex-col items-center z-10">
                <div className="absolute top-10 right-10">
                    <button type="submit"
                        className="w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-slate-600"
                        onClick={() => setIsEditingAvatar(false)}
                    >
                        <X className="text-white" />
                    </button>
                </div>

                <div className="rounded-full shadow-md mt-32 mb-12">
                    {!previewUrl && <img
                        src={authUser?.avatar?.avatarUrl === "" ? authUser?.avatar?.defaultUrl : authUser?.avatar?.avatarUrl || ""}
                        alt="avatar"
                        className="w-48 h-48 rounded-full object-cover"
                    />
                    }
                    {previewUrl &&
                        <img
                            src={previewUrl}
                            alt="avatar"
                            className="w-48 h-48 rounded-full object-cover"
                        />
                    }
                </div>

                <div className="z-10">
                    {!previewUrl &&
                        <div className="flex gap-4 z-10">
                            <button
                                className="w-24 h-12 flex items-center justify-center rounded-full shadow-md bg-slate-100 z-10"
                                onClick={handleInputClick}
                            >
                                更新照片
                            </button>
                            <button
                                className="w-24 h-12 flex items-center justify-center rounded-full shadow-md text-white bg-red-400"
                                onClick={handleDeleteAvatar}
                            >
                                刪除照片
                            </button>
                        </div>
                    }
                    {previewUrl &&
                        <div className="flex gap-4">
                            <button type="submit"
                                className="w-20 h-12 flex items-center justify-center rounded-full shadow-md bg-green-400"
                                onClick={handleUpload}
                            >
                                <Check className="text-white" />
                            </button>
                            <button type="submit"
                                className="w-20 h-12 flex items-center justify-center rounded-full shadow-md bg-red-400"
                                onClick={() => {
                                    setPreviewUrl(false);
                                    setSelectedFile(null);
                                }}
                            >
                                <X className="text-white" />
                            </button>
                        </div>
                    }
                </div>




                <input ref={inputRef} type="file" className="hidden w-20 h-12 rounded-full" onChange={handleFileSelect} />
            </div >

        </>
    )
}
export default UpdateAvatar