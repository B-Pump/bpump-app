import { Picker } from "@react-native-picker/picker";
import { deviceName, osInternalBuildId } from "expo-device";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/ui/button";

import { expo as cfV } from "@/app.json";
import { useAuth } from "@/context/auth";
import { useColorScheme } from "@/lib/color";

export default function Settings() {
    const { onLogout } = useAuth();
    const { setColorScheme, colorScheme, isDarkColorScheme } = useColorScheme();

    const [selectedLanguage, setSelectedLanguage] = useState("male");
    const voice = [
        { value: "male", label: "Homme" },
        { value: "female", label: "Femme" },
    ];

    const theme: { value: "dark" | "system" | "light"; label: string }[] = [
        { value: "light", label: "Clair" },
        { value: "dark", label: "Sombre" },
    ];

    const info = [
        { value: deviceName, label: "Nom de l'appareil" },
        { value: osInternalBuildId, label: "ID de l'appareil" },
        { value: cfV.version, label: "Version du client" },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-2xl text-foreground">Paramètres généraux</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Configurez dès maintenant pour utiliser votre B-Pump !
                    </Text>
                </View>
                <View className="my-3">
                    <Text className="mb-3 text-foreground">🤖​ Configuration du robot</Text>
                    <View className="rounded-lg border border-border">
                        <View className="p-4">
                            <Text className="mb-5 text-foreground">
                                Connectez votre robot en scannant un code QR que vous pouvez retrouver sur la projection
                                à l'allumage du robot.
                            </Text>
                            <Button variant="outline" onPress={() => router.push("/settings/scan")}>
                                <Text className="text-foreground">Scanner le code QR</Text>
                            </Button>
                        </View>
                        <View className="border-t border-border p-4">
                            <Text className="mb-5 text-foreground">
                                Modifier la voix que votre robot B-Pump utilisera pour vous corriger lors de vos
                                exercices. Notez que cela ne marchera que si vous êtes actuellement connecté à votre
                                robot.
                            </Text>
                            <View className="rounded-lg border border-border">
                                <Picker
                                    selectedValue={selectedLanguage}
                                    onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                                    mode="dropdown"
                                    numberOfLines={1}
                                    dropdownIconColor={isDarkColorScheme ? "white" : "black"}
                                    style={{ color: isDarkColorScheme ? "white" : "black" }}
                                >
                                    {voice.map((item, index) => (
                                        <Picker.Item label={item.label} value={item.value} key={index} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="my-3">
                    <Text className="mb-3 text-foreground">🎨​ Thème de l'application</Text>
                    <View className="rounded-lg border border-border">
                        {theme.map((item, index) => (
                            <View className={`p-4 ${index === 0 ? "" : "border-t border-border"}`} key={index}>
                                <TouchableOpacity onPress={() => setColorScheme(item.value)}>
                                    <View className="flex flex-row items-center justify-between">
                                        <Text className="text-foreground">{item.label}</Text>
                                        <View className="items-center justify-center rounded-full border border-border">
                                            <View
                                                className={`size-5 rounded-full ${
                                                    colorScheme === item.value ? "bg-muted-foreground" : ""
                                                }`}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
                <View className="my-3">
                    <Text className="mb-3 text-foreground">📱​ Informations complémentaires</Text>
                    <View className="rounded-lg border border-border">
                        {info.map((item, index) => (
                            <View className={`p-4 ${index === 0 ? "" : "border-t border-border"}`} key={index}>
                                <View className="flex flex-row items-center justify-between">
                                    <Text className="text-foreground">{item.label} :</Text>
                                    <Text className="text-foreground">{item.value}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <View className="my-3">
                    <Text className="mb-3 text-foreground">⚠️ Actions sur votre compte</Text>
                    <View className="rounded-lg border border-border">
                        <View className="p-4">
                            <Text className="mb-5 text-foreground">
                                Vous déconnecter vous raménera à l'écran d'accueil. Vous pourrez toujours utiliser votre
                                compte et vos programmes seront sauvegardés.
                            </Text>
                            <Button variant="outline" onPress={onLogout}>
                                <Text className="text-foreground">Vous déconnecter</Text>
                            </Button>
                        </View>
                        <View className="border-t border-border p-4">
                            <Text className="mb-5 text-foreground">
                                Supprimer votre compte est une action irréversible. Cela supprimera vos programmes et
                                votre activité.
                            </Text>
                            <Button variant="destructive">
                                <Text className="text-destructive-foreground">Supprimer votre compte</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
