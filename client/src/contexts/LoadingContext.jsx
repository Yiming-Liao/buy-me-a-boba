import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
    const [isLoadingContext, setIsLoadingContext] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoadingContext, setIsLoadingContext }}>
            {children}
        </LoadingContext.Provider>
    )
}

// 自定義 Hook，用於在其他組件中方便地取得 LoadingContext 的值
export const useLoadingContext = () => {
    return useContext(LoadingContext);
}