import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketProps {
    socketAdress?: string | null;
    socketValid?: boolean | null;
    socketInstance?: Socket | null;
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
    const [socketInstance, setSocketInstance] = useState<Socket>(null);

    useEffect(() => {
        if (socketAdress) {
            const socket = io(socketAdress, { transports: ["websocket"] });

            socket.io.on("open", () => {
                setSocketValid(true);
            });
            socket.io.on("close", () => {
                setSocketValid(false);
            });

            socket.on("result", (data: number[]) => {
                const test = [
                    // temporary while I make the right data format in bpump-robot
                    { value: 10, time: 0 },
                    { value: 20, time: 1 },
                    { value: 30, time: 2 },
                    { value: 25, time: 3 },
                    { value: 35, time: 4 },
                    { value: 40, time: 5 },
                    { value: 60, time: 6 },
                ];
                router.push({ pathname: "/exos/result", params: { data: JSON.stringify(test) } });
            });

            setSocketInstance(socket);

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
        socketInstance,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
