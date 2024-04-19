import { useColorScheme as useNativewindColorScheme } from "nativewind";

export const THEME_KEY = "theme_jwt";
export const DEFAULT_THEME = "light";

interface ColorProps {
    colorScheme: string;
    isDarkColorScheme: boolean;
    setColorScheme: (scheme: "dark" | "light" | "system") => void;
    toggleColorScheme: () => void;
}

/**
 * Custom nativewind theme hook
 * @author wiizz
 * @returns {ColorProps}
 */
export function useColorScheme(): ColorProps {
    const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();

    return {
        colorScheme: colorScheme ?? "dark",
        isDarkColorScheme: colorScheme === "dark",
        setColorScheme,
        toggleColorScheme,
    };
}
