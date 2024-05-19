import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import DropdownMenu from "./DropdownMenu"
import logo from "../../assets/logo.png";
import home from "../../assets/home.png";

const IsLogin = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            <nav className='w-full h-full flex justify-between items-center m-[3vw]'>
                <button
                    onClick={() => navigate("/")}
                    className="w-16 h-10 rounded-full  shadow-md flex justify-center items-center"
                >
                    <img src={home} alt="home" className="w-6" />
                </button>

                <div className="flex gap-[1.5vw]">
                    <button
                        onClick={() => navigate(`/${authUser.username}/dashboard`)}
                        className="w-24 h-10 rounded-full shadow-md flex justify-center items-center"
                    >
                        我 的
                        <img src={logo} alt="boba tea" className="w-5 mb-1 ml-1" />
                    </button>

                    <div className="rounded-full w-10 h-10 shadow-md overflow-hidden">
                        <DropdownMenu >
                            <img
                                src={authUser?.avatar?.avatarUrl || authUser?.avatar?.defaultUrl}
                                alt="avatar"
                                className="h-full object-cover"
                            />
                        </DropdownMenu>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default IsLogin


