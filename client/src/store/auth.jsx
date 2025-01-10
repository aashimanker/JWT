import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const [user, setUser] = useState("");

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken);
    };

     //checking whether user is logged in or not
     const isLoggedIn = !!token

     const  LogoutUser = () =>{
         setToken("")
         return localStorage.removeItem("token")
         isLoggedIn = false
     }

    const userAuthentication = async () => {
        if (!token) {
            console.log("There's no token available");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/student/user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const studentDetails = await response.json();
                setUser(studentDetails.data);
                console.log(studentDetails.data);
            } else {
                console.error("Failed to authenticate user");
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]);

    return (
        <AuthContext.Provider value={{ storeTokenInLS, token, user, isLoggedIn,LogoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
