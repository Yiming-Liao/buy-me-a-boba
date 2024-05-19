import React, { useState, useEffect, useRef } from 'react';
import useLogout from '../../hooks/auth/useLogout';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

function DropdownMenu({ children }) {
    const { authUser } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();
    const { logout, } = useLogout();
    const navigate = useNavigate();

    // 點擊"選單外面時"關閉選單
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        // 監聽 mouse down 事件
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // 移除監聽
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);
    // 點擊"選單按鈕時"關閉選單
    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div ref={menuRef} className='flex justify-center items-center group'>
            <div className='flex justify-center items-center h-full w-full rounded-full overflow-hidden relative  group-hover:scale-110'>

                <button onClick={() => setIsOpen(!isOpen)}
                    className='absolute top-0 w-24 h-24  rounded-full'
                >
                </button>
                {children}
            </div>

            {isOpen && (
                <div className='absolute top-[83px] right-[2vw] w-fit h-fit flex flex-col p-5 gap-3 rounded-lg z-10 border-2 border-sky-50 bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]'>
                    <button
                        onClick={() => {
                            navigate(`/${authUser.username}/setting`);
                            closeDropdown();
                        }}
                        className="w-16 h-10 rounded-full  shadow-md"
                    >
                        設 定
                    </button>

                    <button
                        onClick={() => {
                            logout();
                            closeDropdown();
                        }}
                        className="w-16 h-10 rounded-full  shadow-md"
                    >
                        登 出
                    </button>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;


