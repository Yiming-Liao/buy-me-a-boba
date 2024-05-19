import { useState } from "react";

const useGetUser = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getUser = async (username) => {
        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/getUser`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ username })
            })

            // 取得後端回傳的資料
            const data = await res.json();

            // 找不到使用者
            if (data.error) return false;

            // 成功找到使用者
            return data;

        } catch (error) {
            console.log("❌ Error useLogin: ", error.message)
        } finally {
            setIsLoading(false);
        }
    }
    return { getUser, isLoading };
}
export default useGetUser;