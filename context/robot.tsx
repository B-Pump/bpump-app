import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

interface RobotProps {
    robotState?: { adress: string | null; connected: boolean | null };
    onConnect?: (adress: string) => Promise<any>;
    onDisconnect?: () => Promise<any>;
}

export const ROBOT_KEY = "robot_jwt";

const RobotContext = createContext<RobotProps>({});

export function useRobot() {
    return useContext(RobotContext);
}

export const RobotProvider = ({ children }: any) => {
    const appState = useRef(AppState.currentState);

    const [robotState, setRobotState] = useState<{
        adress: string | null;
        connected: boolean | null;
    }>({
        adress: null,
        connected: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await getItemAsync(ROBOT_KEY);
            if (token) setRobotState({ adress: token, connected: true });
        };

        loadToken();
    }, []);

    const connect = async (adress: string) => {
        try {
            const result = await setItemAsync(ROBOT_KEY, adress);

            // TODO: setup wifi connection

            setRobotState({ adress: adress, connected: true });
            return result;
        } catch (error) {
            return { error: true, msg: error };
        }
    };

    const disconnect = async () => {
        const result = await deleteItemAsync(ROBOT_KEY);

        // TODO: remove wifi connection

        setRobotState({ adress: null, connected: false });
        return result;
    };

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            // if (appState.current.match(/inactive|background/) && nextAppState === "active") {
            //     connect(robotState.adress);
            // }
            if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
                disconnect();
            }

            appState.current = nextAppState;
        });

        return () => subscription.remove();
    }, []);

    const value = {
        onConnect: connect,
        onDisconnect: disconnect,
        robotState,
    };

    return <RobotContext.Provider value={value}>{children}</RobotContext.Provider>;
};
