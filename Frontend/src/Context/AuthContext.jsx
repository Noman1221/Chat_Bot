/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useState } from "react";

export const authContext = createContext(null);
const baseUrl = "http://localhost:5000"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    const Register = async (username, email, password) => {
        try {
            const result = await axios.post(`${baseUrl}/auth/register`, { username, email, password })
            localStorage.setItem("token", result.token);
            setUser(result);
            return result
        } catch (error) {
            console.log(error);
        };
    };

    const Login = async (email, password) => {
        try {
            const result = await axios.post(`${baseUrl}/auth/login`, { email, password })
            localStorage.setItem("token", result.token);
            setUser(user)
            return result;
        } catch (error) {
            console.log(error);

        }
    };
    const currentUser = async () => {
        let token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        };
        try {
            const result = await axios.get(`${baseUrl}/auth/logUser`)
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const guestPrompt = async (prompt) => {
        try {
            const result = await axios.post(`${baseUrl}/api/prompt/guest`, { prompt });
            if (result.statusText !== "OK") {
                throw new Error("not get response")
            }
            return result.data
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <authContext.Provider value={{ Register, Login, currentUser, user, setUser, guestPrompt }}>
            {children}
        </authContext.Provider>
    );
};
