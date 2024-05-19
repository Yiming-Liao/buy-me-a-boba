import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // 從 localStorage 獲取 User-Data 並設定為當前使用者 (作用於重新加載時*)
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("User-Data")) || null);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

// 自定義 Hook，用於在其他組件中方便地取得 AuthContext 的值
export const useAuthContext = () => {
    return useContext(AuthContext);
}