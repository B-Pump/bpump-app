import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./style/theme.style";

export default function Theme() {
    const [auto, setAuto] = useState(true);
    const [light, setLight] = useState(false);
    const [dark, setDark] = useState(false);

    const setTheme = (auto, light, dark) => {
        setAuto(auto);
        setLight(light);
        setDark(dark);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎨​ Thème de l'application</Text>
            <View style={styles.content}>
                <View style={styles.object(false)}>
                    <TouchableOpacity style={styles.theme} onPress={() => setTheme(true, false, false)}>
                        <Text>Automatique</Text>
                        <View style={styles.circle}>
                            <View style={styles.selection(auto)} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.object(true)}>
                    <TouchableOpacity style={styles.theme} onPress={() => setTheme(false, true, false)}>
                        <Text>Clair</Text>
                        <View style={styles.circle}>
                            <View style={styles.selection(light)} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.object(true)}>
                    <TouchableOpacity style={styles.theme} onPress={() => setTheme(false, false, true)}>
                        <Text>Sombre</Text>
                        <View style={styles.circle}>
                            <View style={styles.selection(dark)} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
