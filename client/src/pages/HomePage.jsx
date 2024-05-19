import Footer from "../components/Footer"
import HoverSpring from "../components/HoverSpring";
import SkewedInfiniteScroll from "../components/SkewedInfiniteScroll";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthContext } from "../contexts/AuthContext";
const Home = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    return (
        <div className="relative min-h-[100svh] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">

                <div className="flex justify-center items-center gap-2 mb-12 m-6 py-4 px-12 max-md:px-10 rounded-xl shadow-lg">
                    <h1 className="text-5xl max-md:text-3xl text-slate-600">Buy Me a Boba</h1>
                    <img src={logo} alt="boba tea" className="w-12 max-md:w-10" />
                </div>

                <div className="flex flex-col justify-center items-center gap-4">
                    <h1 className="text-3xl max-md:text-xl text-slate-600">
                        為創意加油，來杯珍珠奶茶吧！
                    </h1>
                    <p className="text-lg max-md:text-base text-slate-600 mt-4">
                        直接支持你喜愛的創作者，一杯<span className="text-yellow-600">珍珠奶茶</span>的力量！
                    </p>

                    <p></p>
                </div>
            </div>



            <div className="w-full max-md:mt-8">
                <SkewedInfiniteScroll />
            </div>
            <div className="absolute top-[300px] max-md:top-[580px] w-[768px] max-md:w-[400px] mx-auto">
                <HoverSpring />
            </div>

            <button className="absolute top-[615px] max-md:top-[147vh] btn-grad"
                onClick={() => !authUser ? navigate("/signup") : null}
            >
                現在加入
            </button>

            <div className="mt-auto top-[20px] w-full relative max-md:top-[700px]">
                <Footer />
            </div>
        </div>
    )
}
export default Home