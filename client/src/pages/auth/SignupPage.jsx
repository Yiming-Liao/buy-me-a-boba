import { useState } from "react";
import useSignup from "../../hooks/auth/useSignup"

function SignupPage() {
    const [signupData, setsignupData] = useState({
        username: "", email: "", password: "", confirmPassword: ""
    });

    const { signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(signupData);
    }

    return (
        <div className="flex flex-col justify-center] items-center text-slate-600">
            <h1 className="text-5xl m-6">註 冊 🧋</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-10 m-6">

                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="username">使用者名稱</label>
                    <input
                        id="username"
                        type="text"
                        value={signupData.username}
                        onChange={e => setsignupData(prev => ({ ...prev, username: e.target.value }))}
                        className="h-8 shadow-md rounded-full px-4"
                    />
                </div>

                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={signupData.email}
                        onChange={e => setsignupData(prev => ({ ...prev, email: e.target.value }))}
                        className="h-8 shadow-md rounded-full px-4"
                    />
                </div>

                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="password">密 碼</label>
                    <input
                        id="password"
                        type="password"
                        value={signupData.password}
                        onChange={e => setsignupData(prev => ({ ...prev, password: e.target.value }))}
                        className="h-8 shadow-md rounded-full px-4"
                    />
                </div>

                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="confirmPassword">確認密碼</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={e => setsignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="h-8 shadow-md rounded-full px-4"
                    />
                </div>

                <button type="submit"
                    className="w-20 h-12 rounded-full shadow-md"
                >
                    註 冊
                </button>
            </form>

        </div>
    );
}

export default SignupPage;
