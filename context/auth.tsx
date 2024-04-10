import axios from "axios";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { useEffect } from "react";
import { create } from "zustand";

import { API_URL } from "@/lib/api";

type AuthStore = {
    token: string | null;
    authenticated: boolean;
    register: (username: string, password: string) => Promise<any>;
    login: (username: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
    delete: (username: string) => Promise<any>;
    initialize: () => void;
};

export const AUTH_KEY = "auth_jwt";

const useAuthStore = create<AuthStore>((set, get) => ({
    token: null,
    authenticated: false,
    register: async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/register`, { username, password });
            return response;
        } catch (error) {
            return { error: true, msg: error };
        }
    },
    login: async (username: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });

            set({ token: username, authenticated: true });
            axios.defaults.headers.common["Authorization"] = `Bearer ${username}`;
            await setItemAsync(AUTH_KEY, username);

            return response;
        } catch (error) {
            return { error: true, msg: error };
        }
    },
    logout: async () => {
        await deleteItemAsync(AUTH_KEY);
        axios.defaults.headers.common["Authorization"] = "";
        set({ token: null, authenticated: false });
    },
    delete: async (username: string) => {
        try {
            const response = await axios.delete(`${API_URL}/delete?username=${username}`);
            get().logout;

            return response;
        } catch (error) {
            return { error: true, msg: error };
        }
    },
    initialize: async () => {
        const token = await getItemAsync(AUTH_KEY);
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            set({ token, authenticated: true });
        }
    },
}));

export const useAuth = () => {
    const store = useAuthStore();

    useEffect(() => {
        store.initialize();
    }, []);

    return store;
};
