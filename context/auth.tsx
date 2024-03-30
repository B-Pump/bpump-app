import axios from "axios";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

import { API_URL } from "@/lib/api";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onRegister?: (username: string, password: string) => Promise<any>;
    onLogin?: (username: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
    onDelete?: (username: string) => Promise<any>;
}

export const AUTH_KEY = "auth_jwt";

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
            const token = await getItemAsync(AUTH_KEY);
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
            const result = await axios.post(`${API_URL}/login`, { username, password });

            setAuthState({
                token: username,
                authenticated: true,
            });

            axios.defaults.headers.common["Authorization"] = `Bearer ${username}`;

            await setItemAsync(AUTH_KEY, username);

            return result;
        } catch (error) {
            return { error: true, msg: error };
        }
    };

    const logout = async () => {
        await deleteItemAsync(AUTH_KEY);

        axios.defaults.headers.common["Authorization"] = "";

        setAuthState({
            token: null,
            authenticated: false,
        });
    };

    const remove = async (username: string) => {
        try {
            const result = await axios.delete(`${API_URL}/delete?username=${username}`);

            logout();

            return result;
        } catch (error) {
            return { error: true, msg: error };
        }
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onDelete: remove,
        authState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
