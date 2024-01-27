import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "../../constants";
import styles from "./style/robot.style";

export default function Robot() {
    const [selectedLanguage, setSelectedLanguage] = useState("male");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🤖​ Configuration du robot</Text>
            <View style={styles.content}>
                <View style={styles.object(false)}>
                    <Text>
                        Connectez votre robot en scannant un code QR que vous pouvez retrouver au dos de votre
                        exemplaire du robot B-Pump.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => router.push("bpump/scan")}>
                        <Text style={styles.buttonText}>Scanner le code QR</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.object(true)}>
                    <Text>
                        Modifier la voix que votre robot B-Pump utilisera pour vous corriger lors de vos exercices.
                        Notez que cela ne marchera que si vous êtes actuellement connecté à votre robot.
                    </Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                            style={styles.picker}
                            mode="dropdown"
                            dropdownIconColor={COLORS.gray2}
                            numberOfLines={1}
                        >
                            <Picker.Item label="Homme" value="male" />
                            <Picker.Item label="Femme" value="female" />
                        </Picker>
                    </View>
                </View>
            </View>
        </View>
    );
}
