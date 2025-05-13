import { useState, useContext, createContext } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const login = (token, username) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
    };

    return (
        <authContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}