import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type SocketProps = {
    socketAdress?: string | null;
    socketValid?: boolean | null;
    socketInstance?: Socket | null;
    connect?: (address: string) => void;
    disconnect?: () => void;
};

const SocketContext = createContext<SocketProps>({});

export function useSocket() {
    return useContext(SocketContext);
}

// TODO: use zustang to manage socket states

export const SocketProvider = ({ children }: any) => {
    const [socketAdress, setSocketAdress] = useState<string>(null);
    const [socketValid, setSocketValid] = useState<boolean>(false);
    const [socketInstance, setSocketInstance] = useState<Socket>(null);

    useEffect(() => {
        if (socketAdress) {
            const socket = io(socketAdress, { transports: ["websocket"] });

            socket.io.on("open", () => setSocketValid(true));
            socket.io.on("close", () => setSocketValid(false));

            socket.on("result", (data: ChartDataItem) =>
                router.push({ pathname: "/exos/result", params: { data: JSON.stringify(data) } }),
            );

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
        connect,
        disconnect,
        socketAdress,
        socketValid,
        socketInstance,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
