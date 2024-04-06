import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

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

    useEffect(() => {
        if (!socketState.address) return;

        const socket = io(`http://${socketState.address}`, {
            transports: ["websocket"],
        });

        socket.on("open", () => {
            console.log("Open");
        });
        socket.on("close", () => {
            console.log("Close");
        });

        return () => {
            socket.disconnect();
            socket.removeAllListeners();
        };
    }, [socketState]);

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
