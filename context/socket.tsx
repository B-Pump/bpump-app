import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface SocketProps {
    socketAdress?: string | null;
    socketValid?: boolean | null;
    onConnect?: (address: string) => void;
    onDisconnect?: () => void;
}

const SocketContext = createContext<SocketProps>({});

export function useSocket() {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: any) => {
    const [socketAdress, setSocketAdress] = useState<string>(null);
    const [socketValid, setSocketValid] = useState<boolean>(false);

    useEffect(() => {
        if (socketAdress) {
            const socket = io(`http://${socketAdress}`, { transports: ["websocket"] });

            socket.io.on("open", () => {
                setSocketValid(true);
                console.log("Connected to", socketAdress);
            });
            socket.io.on("close", () => {
                setSocketValid(false);
                console.log("Disconnected from", socketAdress);
            });

            return () => {
                socket.disconnect();
                socket.removeAllListeners();
                disconnect();
            };
        }
    }, [socketAdress]);

    const connect = (address: string) => setSocketAdress(address);
    const disconnect = () => setSocketAdress(null);

    const value = {
        onConnect: connect,
        onDisconnect: disconnect,
        socketAdress,
        socketValid,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
