import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import Landing from "./pages/landing.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import ToDo from "./pages/todo.jsx";
import {useAuth} from "./hooks/useAuth.jsx";
import {useEffect} from "react";
import axios from "axios";

export default function RoutePages() {

    const { isLoggedIn, login } = useAuth();

    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Landing />}/>
                <Route path={"/signup"} element={<Signup />}/>
                <Route path={"/login"} element={<Login />} />
                <Route path={"/todos"} element={ isLoggedIn ? <ToDo /> : <Navigate to={"/"} />} />
            </Routes>
        </BrowserRouter>
    )
}