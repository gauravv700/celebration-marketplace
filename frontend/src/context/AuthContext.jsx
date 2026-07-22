import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);

    }, []);

    const login = (accessToken, userData) => {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setToken(accessToken);
        setUser(userData);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                loading,
                isAuthenticated: !!token
            }}

        >

            {children}

        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);