import { PropsWithChildren, createContext, useContext } from "react";

import { useStorageState } from "@/lib/storage";

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function useSession() {
    return useContext(AuthContext);
}

export function SessionProvider(props: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    // TODO: sign-in logic
                    setSession("pierre");
                },
                signOut: () => setSession(null),
                session,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
