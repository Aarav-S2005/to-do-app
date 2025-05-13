import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {useAuth} from "../hooks/useAuth.jsx";
import InputBox from "../components/InputBox.jsx";
import GoBack from "../components/GoBack.jsx";


export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const verifyDetails = () => {
        if (username === "") {
            return "Username is required";
        } else if (password === "") {
            return "Password is required";
        } else if (rePassword === "") {
            return "Please re-enter the password";
        } else if (password !== rePassword) {
            return "Passwords do not match";
        } else if (password.length < 8) {
            return "Password must be at least 8 characters";
        } else if (!/[a-z]/.test(password)) {
            return "Password must contain a lowercase character";
        } else if (!/[A-Z]/.test(password)) {
            return "Password must contain an uppercase character";
        } else if (!/[0-9]/.test(password)) {
            return "Password must contain a number";
        } else if (!/[!@#$^_]/.test(password)) {
            return "Password must contain at least one special character [!, @, #, $, ^, _]";
        } else {
            return "success";
        }
    };

    const handleSignup = async () => {
        const message = verifyDetails();
        if (message !== "success") {
            setErrorMsg(message + "*");
            return;
        }
        setErrorMsg("")
        try{
            const result = await axios.post("http://localhost:5000/api/users/signup", {username, password});
            if (result.data.success) {

                login(result.data.token, username);
                navigate("/todos");
            }
        }catch (error) {
            alert(error.message);
        }

    }

    return (
        <>
            <GoBack />
            <div className={" absolute bg-transparent w-full min-h-screen flex items-center justify-center "}>
                <div
                    className={"bg-gray-500 w-[400px] p-12 flex flex-col gap-6 font-patrick-hand-regular rounded-3xl"}>
                    <span className={"text-4xl text-offwhite font-bold text-center"}>SIGN UP</span>
                    <div className={"flex flex-col gap-5 "}>
                        <label className={"text-2xl text-offwhite flex flex-col gap-2"}>
                            <span>Username:</span>
                            <InputBox type={"text"} maxLength={16} setterFuntion={setUsername} />
                            </label>
                        <label className={"text-2xl text-offwhite flex flex-col gap-2"}>
                            <span>Password:</span>
                            <InputBox type={"password"} maxLength={20} setterFuntion={setPassword} />
                        </label>
                        <label className={"text-2xl text-offwhite flex flex-col gap-2"}>
                            <span>Re-Enter Password:</span>
                            <InputBox type={"password"} maxLength={20} setterFuntion={setRePassword} />
                        </label>
                    </div>
                    <div>
                        <button
                            className={"bg-offwhite w-full text-gray-500 cursor-pointer rounded-xl px-4 py-2 text-3xl hover:scale-105 active:scale-90"}
                            onClick={handleSignup}>CREATE
                        </button>
                        <span className={"text-red-300 text-sm"}>{`${errorMsg}`}</span>
                    </div>
                </div>
            </div>
        </>
    )
}