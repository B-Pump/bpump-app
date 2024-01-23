import { useSegments, router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const rootSegment = useSegments()[0];
    const [user, setUser] = useState("");

    useEffect(() => {
        if (user === undefined) return;

        if (!user && rootSegment !== "(auth)") {
            router.replace("/(auth)/");
        } else if (user && rootSegment !== "(home)") {
            router.replace("/(home)/");
        }
    }, [user, rootSegment]);

    return (
        <AuthContext.Provider
            value={{
                user: user,
                signIn: () => {
                    setUser("wiizzoux");
                },
                signOut: () => {
                    setUser("");
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
