import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useLoadingContext } from "../../contexts/LoadingContext";

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const { setIsLoadingContext } = useLoadingContext();

    const login = async ({ usernameOrEmail, password }) => {
        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ usernameOrEmail, password })
            })

            // 取得後端回傳的資料
            const data = await res.json();
            if (data.error) {
                if (data.reason === "usernameOrEmail") toast(`使用者名稱或Email不存在 :  ${usernameOrEmail}`, { duration: 1500, icon: ' ❌ ' })
                if (data.reason === "password") toast(`密碼錯誤`, { duration: 1500, icon: ' ❌ ' })
                return false; // 傳回 false
            }


            // 儲存使用者資料到 localStorage (必須轉換成JSON格式)
            localStorage.setItem("User-Data", JSON.stringify(data));
            setAuthUser(data);
            toast(`已成功登入`, { duration: 1500, icon: ' ✅ ' });

        } catch (error) {
            console.log("❌ Error useLogin: ", error.message)
        } finally {
            setIsLoading(false);
            setIsLoadingContext(false);
        }

    }
    return { login, isLoading };
}
export default useLogin