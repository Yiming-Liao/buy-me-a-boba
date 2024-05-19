import { useState } from "react";
import toast from "react-hot-toast";

const usePayout = () => {
    const [isLoading, setIsLoading] = useState(false);

    const payout = async (username, payoutTotal) => {
        // 傳資料到後端中..
        setIsLoading(true);
        try {
            // POST 資料到後端
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/payout `, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ username, payoutTotal })
            })

            // 取得後端回傳的資料
            const data = await res.json();

            // 找不到使用者
            if (data.error) return toast(`不知名錯誤`, { duration: 1500, icon: ' ❌ ' })

            // 成功找到使用者
            window.location.reload();
            console.log(data);
            return data;

        } catch (error) {
            console.log("❌ Error usePayout: ", error.message)
        } finally {
            setIsLoading(false);
        }
    }
    return { payout, isLoading };
}
export default usePayout;