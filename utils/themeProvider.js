import { createContext, useContext, useState } from "react"

import { COLORS } from "../constants"

/**
 * Context to manage the application theme
 * @typedef {Object} ThemeContextType
 * @property {boolean} dark - Indicates whether the theme is dark
 * @property {Object} colors - Theme colors
 * @property {Function} setScheme - Function to set the theme schema
 */

/**
 * App theme background
 * @type {React.Context<ThemeContextType>}
 */
export const ThemeContext = createContext({
    dark: false,
    colors: COLORS.lightWhite,
    setScheme: () => {},
})

/**
 * Theme provider to wrap the application with theme context
 * @param {Object} props - Component Properties
 * @param {React.ReactNode} props.children - Child components encapsulated in theme provider
 * @returns {React.Component} - Component with theme context
 */
export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState()

    const defaultTheme = {
        dark: isDark,
        colors: {
            background: isDark ? COLORS.tertiary : COLORS.lightWhite,
            text: isDark ? COLORS.lightWhite : "black",
            icon: isDark ? COLORS.lightWhite : COLORS.tertiary,
            showall: isDark ? COLORS.secondary : COLORS.gray,
        },
        setScheme: (scheme) => setIsDark(scheme == "dark"),
    }

    return (
        <>
            <ThemeContext.Provider value={defaultTheme}>
                {children}
            </ThemeContext.Provider>
        </>
    )
}

/**
 * Hook to use theme context
 * @returns {ThemeContextType} - Current value of theme context
 */
export const useTheme = () => useContext(ThemeContext)
