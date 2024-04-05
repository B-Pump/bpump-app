import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

interface RobotProps {
    robotState?: { connected: boolean | null };
    onConnect?: (mode: string) => Promise<any>;
    onDisconnect?: () => Promise<any>;
}

export const ROBOT_KEY = "robot_jwt";

const RobotContext = createContext<RobotProps>({});

export function useRobot() {
    return useContext(RobotContext);
}

export const RobotProvider = ({ children }: any) => {
    const [robotState, setRobotState] = useState<{
        connected: boolean | null;
    }>({
        connected: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await getItemAsync(ROBOT_KEY);
            if (token) setRobotState({ connected: true });
        };
        loadToken();
    }, []);

    const connect = async (mode: string) => {
        try {
            const result = await setItemAsync(ROBOT_KEY, mode);

            setRobotState({ connected: true });
            return result;
        } catch (error) {
            return { error: true, msg: error };
        }
    };

    const disconnect = async () => {
        const result = await deleteItemAsync(ROBOT_KEY);

        setRobotState({ connected: false });
        return result;
    };

    const value = {
        onConnect: connect,
        onDisconnect: disconnect,
        robotState,
    };

    return <RobotContext.Provider value={value}>{children}</RobotContext.Provider>;
};
