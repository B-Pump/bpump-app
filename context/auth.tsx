import axios from "axios";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

import { API_URL } from "@/lib/api";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (username: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "auth_jwt";

const AuthContext = createContext<AuthProps>({});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await getItemAsync(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true,
                });
            }
        };
        loadToken();
    }, []);

    const register = async (username: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/register`, { username, password });
        } catch (error) {
            return { error: true, msg: error };
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/login?username=${username}&password=${password}`);

            setAuthState({
                token: username,
                authenticated: true,
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${username}`;

            await setItemAsync(TOKEN_KEY, username);

            return result;
        } catch (error) {
            return { error: true, msg: error };
        }
    };

    const logout = async () => {
        await deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common["Authorization"] = "";

        setAuthState({
            token: null,
            authenticated: false,
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
