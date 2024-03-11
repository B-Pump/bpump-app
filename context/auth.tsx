import { PropsWithChildren, createContext, useContext } from "react";

import useFetch from "@/lib/api";
import { useStorageState } from "@/lib/storage";

const AuthContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    load: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    load: false,
});

export function useSession() {
    return useContext(AuthContext);
}

export function SessionProvider(props: PropsWithChildren) {
    const [[load, session], setSession] = useStorageState("session");

    const { data, isLoading, error } = useFetch("GET", "exos/all");

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    // TODO: sign-in logic
                    setSession("pierre");
                },
                signOut: () => setSession(null),
                session,
                load,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
