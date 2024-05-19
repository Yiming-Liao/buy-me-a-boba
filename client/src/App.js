import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar/Navbar';

import HomePage from "./pages/HomePage";
import PublicPage from "./pages/PublicPage"

import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";

import DashboardPage from "./pages/private/DashboardPage";
import SettingPage from './pages/private/SettingPage';
import PayoutRecordPage from './pages/private/PayoutRecordPage';

import { useLoadingContext } from './contexts/LoadingContext';
import { useEffect, useState } from 'react';
import LoadingDots from './components/LoadingDots';


function App() {
  const { authUser } = useAuthContext();
  const { isLoadingContext } = useLoadingContext();

  const [isFading, setIsFading] = useState(false);

  // Loading 漸出效果
  useEffect(() => {
    if (!isLoadingContext) {
      // 讀取完成，開始淡出動畫
      setIsFading(true);
      // 動畫結束後完全移除
      const timer = setTimeout(() => setIsFading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoadingContext]);

  return (
    <div className='relative w-screen min-h-[100svh]'>
      <Navbar />

      <Routes>
        {/* Home 首頁 */}
        <Route path='/' element={<HomePage />} />
        {/* Auth 註冊 & 登入 */}
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignupPage />} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> : <LoginPage />} />

        {/* User 公開頁面 */}
        <Route path='/:username' element={<PublicPage />} />
        {/* User Dashboard [PRIVATE ROUTE] */}
        <Route path='/:username/dashboard' element={authUser ? <DashboardPage /> : <Navigate to="/" />} />
        {/* User Payout records [PRIVATE ROUTE] */}
        <Route path='/:username/dashboard/payoutrecord' element={authUser ? <PayoutRecordPage /> : <Navigate to="/" />} />
        {/* User Setting [PRIVATE ROUTE] */}
        <Route path='/:username/setting' element={authUser ? <SettingPage /> : <Navigate to="/" />} />


        {/* 隨機網址皆切回主畫面 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {(isLoadingContext || isFading) &&
        <>
          <div className={`fixed top-0 left-0 w-[100vw] min-h-full bg-slate-200 opacity-50 ${isFading ? 'fade-out' : ''}`}></div>
          <div className={`absolute top-[50vh] left-[50vw] -translate-y-[50%] -translate-x-[50%] scale-150  ${isFading ? 'fade-out' : ''}`}>
            <LoadingDots />
          </div>
        </>
      }
      <Toaster />
    </div>
  );
}

export default App;