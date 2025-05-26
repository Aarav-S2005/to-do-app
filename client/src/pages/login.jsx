import {useState} from "react";
import {useAuth} from "../hooks/useAuth.jsx";
import axios from "axios";
import {useNavigate} from "react-router";
import InputBox from "../components/inputs/InputBox.jsx";
import GoBack from "../components/GoBack.jsx";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const result = await axios.post("http://localhost:5000/api/users/login", {username, password});
            const token = result.data.token;
            login(token, username);
            navigate("/todos")
        }catch (error) {
            alert("Invalid Credentials");
        }
    }

    return (
        <>
            <GoBack />
            <div className={" absolute bg-transparent w-full min-h-screen flex items-center justify-center "}>
                <div
                    className={"bg-gray-500 w-[400px] p-12 flex flex-col gap-8 font-patrick-hand-regular rounded-3xl backdrop-blur-2xl"}>
                    <span className={"text-3xl text-offwhite"}>Log In</span>
                    <div className={"flex flex-col gap-5 "}>
                        <label className={"text-2xl text-offwhite flex flex-col gap-2"}>
                            <span>Username:</span>
                            <InputBox type={"text"} maxLength={16} setterFuntion={setUsername} />
                        </label>
                        <label className={"text-2xl text-offwhite flex flex-col gap-2"}>
                            <span>Password:</span>
                            <InputBox type={"password"} maxLength={20} setterFuntion={setPassword} />
                        </label>
                    </div>
                    <button className={"bg-offwhite text-gray-500 cursor-pointer rounded-xl px-4 py-2 text-3xl hover:scale-105 active:scale-90"}
                        onClick={handleLogin}>LOGIN
                    </button>
                </div>
            </div>
        </>
    )
}