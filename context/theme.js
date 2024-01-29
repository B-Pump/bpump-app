import { createContext, useContext, useState } from "react";

import { COLORS } from "../constants";

export const ThemeContext = createContext({
    mode: "auto",
    colors: COLORS.white,
    setScheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState("auto");
    const defaultTheme = {
        mode: mode,
        colors: {
            background: mode === "dark" ? COLORS.dark.background : COLORS.light.background,
            text: mode === "dark" ? COLORS.dark.text : COLORS.light.text,
            icon: mode === "dark" ? COLORS.secondary : COLORS.primary,
        },
        setScheme: (scheme) => setMode(scheme),
    };

    return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
