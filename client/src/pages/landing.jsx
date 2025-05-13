import {Link, useNavigate} from "react-router";
import {useAuth} from "../hooks/useAuth.jsx";
import {useEffect} from "react";
import axios from "axios";

export default function Landing() {

    const navigate = useNavigate();
    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
        const setToken = async () => {
            const token = localStorage.getItem("token");
            if (token){
                try {
                    const result = await axios.get('http://localhost:5000/api/users/current', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    login(token, result.data.username);
                    navigate("/todos");
                }catch (error){
                    console.log(error);
                }
            }}
        setToken();
    }, []);

    const handleLogin = () => {
        if(isLoggedIn) {
            navigate("/todos");
        }
        else {
            navigate("/login");
        }
    }

    return (
        <>
            <nav className={"absolute w-full bg-[#273F4F] text-white  px-6 py-4 flex items-center justify-between"}>
                <span className={"font-pacifico-regular text-5xl"}>ToDoVerse</span>
                <div className={"flex items-center justify-center font-patrick-hand-regular gap-5 text-3xl"}>
                    <Link to={"/signup"}>
                        <button className={"px-3 text-[#273F4F] rounded-lg bg-white cursor-pointer active:scale-95"}>SIGN UP</button>
                    </Link>
                    <button className={"px-3 text-white border-white border-2 rounded-lg cursor-pointer active:scale-95"} onClick={handleLogin}>LOGIN</button>
                </div>
            </nav>
        </>
    )
}