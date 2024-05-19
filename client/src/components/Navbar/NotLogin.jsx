import { useNavigate } from "react-router-dom"
import home from "../../assets/home.png";

const NotLogin = () => {
    const navigate = useNavigate();

    return (
        <nav className='w-full h-full flex justify-between items-center m-[3vw]'>
            <button
                onClick={() => navigate("/")}
                className="w-16 h-10 rounded-full  shadow-md flex justify-center items-center"
            >
                <img src={home} alt="home" className="w-6" />
            </button>

            <div className="flex gap-[1vw]">
                <button
                    onClick={() => navigate("/signup")}
                    className="w-16 h-10 rounded-full shadow-md"
                >
                    註 冊
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="w-16 h-10 rounded-full  shadow-md"
                >
                    登 入
                </button>
            </div>
        </nav>
    )
}
export default NotLogin
