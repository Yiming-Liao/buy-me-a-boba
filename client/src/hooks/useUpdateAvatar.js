import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useUpdateAvatar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const updateAvatar = async (file, userId) => {
        // FormData
        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("userId", userId); // 如果需要，也可以添加其他字段

        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/updateavatar`, {
                method: "PATCH",
                credentials: 'include',
                body: formData,
            })

            // 取得後端回傳的資料
            const data = await res.json();
            if (data.error) return toast(`不知名錯誤`, { duration: 1500, icon: ' ❌ ' });

            // 找到 localStorage 中的 "User-Data"
            const storedData = JSON.parse(localStorage.getItem("User-Data"));
            // 只更新 avatar 對象中的 avatarUrl 屬性
            const updatedAvatarData = { ...storedData.avatar, avatarUrl: data.avatarUrl };
            // 更新整個用戶資料中的 avatar 對象
            const updatedData = { ...storedData, avatar: updatedAvatarData };
            // 重新存儲更新後的用戶資料到 localStorage 的 "User-Data"
            localStorage.setItem("User-Data", JSON.stringify(updatedData));
            setAuthUser(updatedData);
            toast(`已成功設置`, { duration: 1500, icon: ' ✅ ' });

        } catch (error) {
            console.log("❌ Error useUpdateAvatar: ", error.message)
        } finally {
            setIsLoading(false);
        }
    }
    return { updateAvatar, isLoading };
}
export default useUpdateAvatar;