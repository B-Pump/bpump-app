import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { COLORS } from '../constants';

export const ThemeContext = createContext({
    dark: false,
    colors: COLORS.lightWhite,
    setScheme: () => {}
});

export const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme(colorScheme == "dark");
    const [isDark, setIsDark] = useState(colorScheme == "dark");

    useEffect(() => {
        setIsDark(colorScheme == "dark")
    },[colorScheme])

    const defaultTheme = {
        dark: isDark,
        colors: isDark ? COLORS.tertiary : COLORS.lightWhite,
        setScheme: (scheme) => setIsDark(scheme == "dark")
    }
    return <>
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    </>
}

export const useTheme = () => useContext(ThemeContext)