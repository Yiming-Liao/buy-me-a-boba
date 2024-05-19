import { useState } from "react";
import useLogin from "../../hooks/auth/useLogin";

const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ usernameOrEmail, password });
    }
    return (
        <div className="flex flex-col justify-center] items-center text-slate-600">
            <h1 className="text-5xl m-6">登 入 🧋</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-10 m-6">

                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="usernameOrEmail">使用者名稱 / Email </label>
                    <input
                        id="usernameOrEmail"
                        type="text"
                        value={usernameOrEmail}
                        onChange={e => setUsernameOrEmail(e.target.value)}
                        className="h-8 shadow-md rounded-full px-4"
                    />
                </div>

                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="password">密 碼</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="h-8 shadow-md rounded-full px-4"
                    />
                </div>

                <button type="submit"
                    className="w-20 h-12 rounded-full shadow-md"
                >
                    登 入
                </button>
            </form>

        </div>
    )
}
export default LoginPage