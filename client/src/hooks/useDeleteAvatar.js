import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useDeleteAvatar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const deleteAvatar = async () => {
        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/deleteavatar`, {
                method: 'DELETE',
                credentials: 'include',
            });

            // 取得後端回傳的資料
            const data = await response.json();
            if (data.error) {
                toast(`無法刪除該照片`, { duration: 1500, icon: ' ❌ ' })
                return console.log(data.error);
            }

            // 找到 localStorage 中的 "User-Data"
            const storedData = JSON.parse(localStorage.getItem("User-Data"));
            // 只更新 avatar 對象中的 avatarUrl 屬性
            const updatedAvatarData = { ...storedData.avatar, avatarUrl: data.avatarUrl };
            // 更新整個用戶資料中的 avatar 對象
            const updatedData = { ...storedData, avatar: updatedAvatarData };
            console.log(updatedData.avatar)
            // 重新存儲更新後的用戶資料到 localStorage 的 "User-Data"
            localStorage.setItem("User-Data", JSON.stringify(updatedData));
            setAuthUser(updatedData);
            toast(`已成功刪除`, { duration: 1500, icon: ' ✅ ' });

        } catch (error) {
            console.log("❌ Error useDeleteAvatar: ", error.message)
        } finally {
            setIsLoading(false);
        }
    }
    return { deleteAvatar, isLoading };
}
export default useDeleteAvatar;