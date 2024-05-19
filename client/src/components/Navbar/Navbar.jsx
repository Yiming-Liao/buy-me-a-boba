import { useAuthContext } from "../../contexts/AuthContext";
import IsLogin from "./IsLogin";
import NotLogin from "./NotLogin";

const Navbar = () => {
    const { authUser } = useAuthContext();

    return (
        <>
            <div className="w-full h-20 flex justify-center items-center shadow-md mb-6 text-slate-600">
                {authUser ? (
                    <IsLogin />
                ) : (
                    <NotLogin />
                )}
            </div>
        </>
    )
}
export default Navbar


