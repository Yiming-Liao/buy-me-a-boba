import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useUpdateUserData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const updateUserData = async (username, email) => {
        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/updateuserdata`, {
                method: "PATCH",
                credentials: 'include',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ username, email })
            });

            // 取得後端回傳的資料
            const data = await res.json();
            if (data.error) {
                if (data.reason === "username") toast(`使用者名稱已存在 :  ${username}`, { duration: 1500, icon: ' ❌ ' })
                if (data.reason === "email") toast(`Email已存在 :  ${email}`, { duration: 1500, icon: ' ❌ ' })
                return false; // 傳回 false
            }

            // 找到 localStorage 中的 "User-Data" 並更新 username & email
            const storedUserData = JSON.parse(localStorage.getItem("User-Data"));
            const updatedData = { ...storedUserData, username: data.username, email: data.email };
            // 儲存使用者資料到 localStorage (必須轉換成JSON格式)
            localStorage.setItem("User-Data", JSON.stringify(updatedData));
            setAuthUser(updatedData);

            toast(`已成功設置`, { duration: 1500, icon: ' ✅ ' })
            return true; // 傳回 true

        } catch (error) {
            console.log("❌ Error useUpdateUserData: ", error.message)
        } finally {
            setIsLoading(false);
        }
    }
    return { updateUserData, isLoading };
}

export default useUpdateUserData;