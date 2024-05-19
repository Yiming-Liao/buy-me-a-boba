import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useLoadingContext } from "../../contexts/LoadingContext";

const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const { setIsLoadingContext } = useLoadingContext();

    const logout = async () => {
        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-type": "application/json" }
            })

            // 取得後端回傳的資料 (成功訊息或錯誤訊息)
            const data = res.json();
            if (data.error) throw new Error(data.error); // 錯誤處理

            // 移除 localStorage 的使用者資料
            localStorage.removeItem("User-Data");
            setAuthUser(null);
            toast(`已成功登出`, { duration: 1500, icon: ' ✅ ' });

        } catch (error) {
            console.log("❌ Error useLogout: ", error.message)
        } finally {
            setIsLoading(false);
            setIsLoadingContext(false);
        }
    }
    return { logout, isLoading };
}
export default useLogout