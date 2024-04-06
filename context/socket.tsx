import { createContext, useContext, useState } from "react";

interface SocketProps {
    socketState?: { address: string | null; connected: boolean | null };
    onConnect?: (address: string) => void;
    onDisconnect?: () => void;
}

const SocketContext = createContext<SocketProps>({});

export function useSocket() {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: any) => {
    const [socketState, setSocketState] = useState<{
        address: string | null;
        connected: boolean | null;
    }>({
        address: null,
        connected: null,
    });

    const connect = (address: string) => {
        setSocketState({ address: address, connected: true });
    };
    const disconnect = () => {
        setSocketState({ address: null, connected: false });
    };

    const value = {
        onConnect: connect,
        onDisconnect: disconnect,
        socketState,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
