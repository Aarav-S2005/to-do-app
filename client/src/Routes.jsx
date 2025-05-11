import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Landing from "./pages/landing.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import ToDo from "./pages/todo.jsx";
import {useAuth} from "./hooks/useAuth.jsx";

export default function RoutePages() {

    const { isLoggedIn } = useAuth();

    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Landing/>}/>
                <Route path={"/signup"} element={<Signup/>}/>
                <Route path={"/login"} element={<Login />} />
                <Route path={"/todos"} element={
                    isLoggedIn ?
                    <ToDo /> :
                        <Navigate to={"/login"} />
                }/>
            </Routes>
        </BrowserRouter>
    )
}