import { useState } from "react";

const useGetPayout = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getPayout = async (userId) => {
        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/getpayoutrecord`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ userId })
            })

            // 取得後端回傳的資料
            const data = await res.json();

            // 找不到使用者
            if (data.error) return false;

            // 成功，return 資料
            return data;

        } catch (error) {
            console.log("❌ Error useGetPayout: ", error.message)
        } finally {
            setIsLoading(false);
        }
    }
    return { getPayout, isLoading };
}
export default useGetPayout;