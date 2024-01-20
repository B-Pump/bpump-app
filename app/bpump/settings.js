import { useState } from "react"
import { Text, View, SafeAreaView, ScrollView, Switch } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Stack } from "expo-router"

import { useTheme } from "../../utils/themeProvider"
import { version } from "../../package.json"
import { osInternalBuildId } from "expo-device"

import { COLORS, SIZES } from "../../constants"
import styles from "../../styles/bpump"

/**
 * Component representing the application settings screen
 * @returns {React.Component} - Settings Screen Component
 */
const BpumpSettings = () => {
    const { dark, colors, setScheme } = useTheme()
    const [selectedVoice, setSelectedVoice] = useState("rien")

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: colors.background },
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <View style={styles.settingSwitch}>
                        <Text style={{ color: colors.text }}>
                            Utiliser le mode sombre
                        </Text>
                        <Switch
                            trackColor={{
                                true: COLORS.gray2,
                                false: COLORS.gray2,
                            }}
                            onChange={() => {
                                dark ? setScheme("light") : setScheme("dark")
                            }}
                            value={dark}
                            thumbColor={COLORS.white}
                        />
                    </View>
                    <View>
                        <Picker
                            style={{ color: colors.text }}
                            selectedValue={selectedVoice}
                            onValueChange={(itemValue) => {
                                setSelectedVoice(itemValue)
                            }}
                        >
                            <Picker.Item
                                label="Modifier la voix du robot"
                                value="rien"
                            />
                            <Picker.Item
                                label="Homme 1 (par défaut)"
                                value="voice_h1"
                            />
                            <Picker.Item label="Homme 2" value="voice_h2" />
                            <Picker.Item label="Femme 1" value="voice_f1" />
                            <Picker.Item label="Femme 2" value="voice_f2" />
                        </Picker>
                    </View>
                    <View>
                        <Text
                            style={[
                                styles.settingTitle,
                                { color: colors.text },
                            ]}
                        >
                            Informations complémentaires
                        </Text>
                        <View style={styles.settingDevice}>
                            <Text style={{ color: colors.text }}>
                                ID de l'appareil : {osInternalBuildId}
                            </Text>
                            <Text style={{ color: colors.text }}>
                                Version du client : {version}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BpumpSettings
