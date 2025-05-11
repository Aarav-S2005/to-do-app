import {useState} from "react";
import {useAuth} from "../hooks/useAuth.jsx";
import axios from "axios";
import {useNavigate} from "react-router";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const result = await axios.post("http://localhost:5000/api/users/login", {username, password});
            const token = result.data.token;
            login(token);
            navigate("/todos")
        }catch (error) {
            console.log(error);
            alert("Invalid Credentials");
        }
    }

    return (
        <>
            <div className={" absolute bg-transparent w-full min-h-screen flex items-center justify-center "}>
                <div
                    className={"bg-orange w-sm p-12 flex flex-col gap-8 font-patrick-hand-regular rounded-3xl backdrop-blur-2xl"}>
                    <span className={"text-3xl color-quaternary"}>Log In</span>
                    <div className={"flex flex-col gap-5 "}>
                        <label className={"text-2xl color-quaternary flex flex-col gap-2"}>
                            <span>Username:</span>
                            <input type={"text"}
                                   className={"font-short-stack-regular px-5 py-2 border-none outline-none bg-tertiary rounded-4xl text-black"}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </label>
                        <label className={"text-2xl color-quaternary flex flex-col gap-2"}>
                            <span>Password:</span>
                            <input type={"password"}
                                   className={"font-short-stack-regular px-5 py-2 border-none outline-none bg-tertiary rounded-4xl text-black"}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                    </div>
                    <button className={"bg-quaternary  color-primary cursor-pointer rounded-xl px-4 py-2 text-3xl hover:scale-105 active:scale-90"}
                        onClick={handleLogin}>Login
                    </button>
                </div>
            </div>
        </>
    )
}