import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useLoadingContext } from "../../contexts/LoadingContext";

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const { setIsLoadingContext } = useLoadingContext();

    const signup = async ({ username, email, password, confirmPassword }) => {
        // 檢查資料
        if (!checkData(username, email, password, confirmPassword)) return;
        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ username, email, password, confirmPassword })
            });

            // 取得後端回傳的資料
            const data = await res.json();
            if (data.error) throw new Error(data.error); // 錯誤處理

            // 儲存使用者資料到 localStorage (必須轉換成JSON格式)
            localStorage.setItem("User-Data", JSON.stringify(data));
            setAuthUser(data);
            toast(`已成功註冊`, { duration: 1500, icon: ' ✅ ' });

        } catch (error) {
            console.log("❌ Error useSignup: ", error.message);
        } finally {
            setIsLoading(false);
            setIsLoadingContext(false);
        }
    }
    return { signup, isLoading };
}
export default useSignup;



// 檢查資料
const checkData = (username, email, password, confirmPassword) => {
    if (username.trim() === "") {
        toast(`使用者名稱不得為空`, { duration: 1500, icon: ' ❌ ' });
        return false
    }
    if (email.trim() === "") {
        toast(`Email 不得為空`, { duration: 1500, icon: ' ❌ ' });
        return false
    }
    if (password.trim() === "") {
        toast(`密碼不得為空`, { duration: 1500, icon: ' ❌ ' });
        return false
    }
    if (password.length < 6) {
        toast(`密碼字數不得小於 6 個`, { duration: 1500, icon: ' ❌ ' });
        return false
    }
    if (confirmPassword.trim() === "") {
        toast(`確認密碼不得為空`, { duration: 1500, icon: ' ❌ ' });
        return false
    }
    if (password !== confirmPassword) {
        toast(`兩次密碼不符合`, { duration: 1500, icon: ' ❌ ' });
        return false
    }
    return true;
}