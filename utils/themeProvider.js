import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { COLORS } from '../constants';

/**
 * Contexte pour gérer le thème de l'application
 * @typedef {Object} ThemeContextType
 * @property {boolean} dark - Indique si le thème est sombre.
 * @property {Object} colors - Couleurs du thème.
 * @property {Function} setScheme - Fonction pour définir le schéma du thème.
 */

/**
 * Contexte du thème de l'application
 * @type {React.Context<ThemeContextType>}
 */
export const ThemeContext = createContext({
    dark: false,
    colors: COLORS.lightWhite,
    setScheme: () => {}
});

/**
 * Fournisseur de thème pour encapsuler l'application avec le contexte du thème
 * @param {Object} props - Propriétés du composant 
 * @param {React.ReactNode} props.children - Composants enfants encapsulés dans le fournisseur de thème
 * @returns {React.ReactNode} - Composant avec le contexte du thème
 */
export const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme() || "light";
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

/**
 * Hook pour utiliser le contexte du thème
 * @returns {ThemeContextType} - Valeur actuelle du contexte du thème
 */
export const useTheme = () => useContext(ThemeContext)