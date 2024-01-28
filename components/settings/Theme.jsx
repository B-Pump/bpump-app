import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "../../context/theme";

import styles from "./style/theme.style";

export default function Theme() {
    const [autoMode, setAutoMode] = useState(true);
    const [lightMode, setLightMode] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const { setScheme } = useTheme();
    const setTheme = (a, l, d) => {
        setAutoMode(a);
        setLightMode(l);
        setDarkMode(d);

        if (a === true && l === false && d === false) {
            setScheme("auto");
        } else if (l === true && a === false && d === false) {
            setScheme("light");
        } else if (d === true && a === false && l === false) {
            setScheme("dark");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎨​ Thème de l'application</Text>
            <View style={styles.content}>
                <View style={styles.object(false)}>
                    <TouchableOpacity style={styles.theme} onPress={() => setTheme(true, false, false)}>
                        <Text>Automatique</Text>
                        <View style={styles.circle}>
                            <View style={styles.selection(autoMode)} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.object(true)}>
                    <TouchableOpacity style={styles.theme} onPress={() => setTheme(false, true, false)}>
                        <Text>Clair</Text>
                        <View style={styles.circle}>
                            <View style={styles.selection(lightMode)} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.object(true)}>
                    <TouchableOpacity style={styles.theme} onPress={() => setTheme(false, false, true)}>
                        <Text>Sombre</Text>
                        <View style={styles.circle}>
                            <View style={styles.selection(darkMode)} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
