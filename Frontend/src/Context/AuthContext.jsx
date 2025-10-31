/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext } from "react";

export const authContext = createContext(null);
const baseUrl = "http://localhost:5000"

export const AuthProvider = ({ children }) => {

    const Register = async (username, email, password) => {
        try {
            const result = await axios.post(`${baseUrl}/auth/register`, { username, email, password })
            return result
        } catch (error) {
            console.log(error);
        };
    };

    const Login = async (email, password) => {
        try {
            const result = await axios.post(`${baseUrl}/auth/login`, { email, password })
            return result;
        } catch (error) {
            console.log(error);

        }
    };
    const currentUser = async () => {
        try {
            const result = await axios.get(`${baseUrl}/auth/logUser`)
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <authContext.Provider value={{ Register, Login, currentUser }}>
            {children}
        </authContext.Provider>
    );
};
