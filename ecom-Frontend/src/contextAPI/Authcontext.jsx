import React, { createContext, useState } from "react";
import { login } from "../service/All-API";

export const userContext = createContext();

const Authcontext = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem("user");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const loginUser = async (userData) => {
        try {
            const response = await login(userData);
            console.log("Login Response:", response);

            if (response.status === 200) {
                const loggedUser = response.data;

                if (loggedUser.status === "Inactive") {
                    alert("Your account is deactivated. Please contact admin.");
                    return { success: false, message: "Account inactive" };
                }

                setIsLoggedIn(true);
                setUser(loggedUser);

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("user", JSON.stringify(loggedUser));

                return { success: true, user: loggedUser };
            } else {
                if (response.status === 401 || response.status === 400) {
                    alert(response.data);
                }

                return { success: false, message: "Invalid credentials" };
            }
        } catch (error) {
            console.log("Login error:", error);
            return { success: false, message: "Login failed" };
        }
    };



    return (
        <userContext.Provider value={{ isLoggedIn, user, login: loginUser }}>
            {children}
        </userContext.Provider>
    );
};

export default Authcontext;




