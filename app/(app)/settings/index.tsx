import { Picker } from "@react-native-picker/picker";
import { deviceName, osInternalBuildId } from "expo-device";
import { router } from "expo-router";
import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/auth";
import { THEME_KEY, useColorScheme } from "@/lib/color";

import { expo as cfV } from "@/app.json";
import { useRobot } from "@/context/robot";

interface Mode {
    value: string;
    label: string;
}
interface Theme {
    value: "dark" | "system" | "light";
    label: string;
}
interface Info {
    value: string;
    label: string;
}

export default function Settings() {
    const { onLogout, onDelete, authState } = useAuth();
    const { onConnect, onDisconnect, robotState } = useRobot();

    const { setColorScheme, colorScheme, isDarkColorScheme } = useColorScheme();

    const [selectedMode, setSelectedMode] = useState<string>("bluetooth");
    const mode: Mode[] = [
        { value: "bluetooth", label: "Bluetooth" },
        { value: "wifi", label: "WiFi" },
    ];

    const theme: Theme[] = [
        { value: "light", label: "Clair" },
        { value: "dark", label: "Sombre" },
    ];

    const info: Info[] = [
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
                            {robotState.connected ? (
                                <>
                                    <Text className="mb-5 text-foreground">
                                        Vous êtes actuellement connecté à votre robot. Si vous rencontrez des problèmes,
                                        vous pouvez essayer de vous déconnecter et de vous reconnecter pour résoudre
                                        tout dysfonctionnement éventuel.
                                    </Text>
                                    <Button
                                        variant="outline"
                                        onPress={() => {
                                            onDisconnect();
                                            // TODO: remove bluetooth or wifi connection
                                        }}
                                    >
                                        <Text className="text-foreground">Déconnexion</Text>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Text className="mb-5 text-foreground">
                                        Connectez votre robot en scannant un code QR que vous pouvez retrouver sur la
                                        projection à l'allumage du robot.
                                    </Text>
                                    <Button
                                        variant="outline"
                                        onPress={() =>
                                            router.push({ pathname: "/settings/scan", params: { value: selectedMode } })
                                        }
                                    >
                                        <Text className="text-foreground">Scanner le code QR</Text>
                                    </Button>
                                </>
                            )}
                        </View>
                        <View className="border-t border-border p-4">
                            <Text className="mb-5 text-foreground">
                                Choisissez le type de connexion à utiliser pour la liaison entre l'application et votre
                                robot.
                            </Text>
                            <View className="rounded-lg border border-border">
                                <Picker
                                    selectedValue={selectedMode}
                                    onValueChange={(itemValue) => setSelectedMode(itemValue)}
                                    mode="dropdown"
                                    numberOfLines={1}
                                    dropdownIconColor={isDarkColorScheme ? "white" : "black"}
                                    style={{ color: isDarkColorScheme ? "white" : "black" }}
                                >
                                    {mode.map((item: Mode, index: number) => (
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
                        {theme.map((item: Theme, index: number) => (
                            <View className={`p-4 ${index !== 0 && "border-t border-border"}`} key={index}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setItemAsync(THEME_KEY, item.value);
                                        setColorScheme(item.value);
                                    }}
                                >
                                    <View className="flex flex-row items-center justify-between">
                                        <Text className="text-foreground">{item.label}</Text>
                                        <View className="items-center justify-center rounded-full border border-border">
                                            <View
                                                className={`size-5 rounded-full ${
                                                    colorScheme === item.value && "bg-muted-foreground"
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
                        {info.map((item: Info, index: number) => (
                            <View className={`p-4 ${index !== 0 && "border-t border-border"}`} key={index}>
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
                            <Button
                                variant="outline"
                                onPress={() => {
                                    deleteItemAsync(THEME_KEY);
                                    onLogout();
                                }}
                            >
                                <Text className="text-foreground">Vous déconnecter</Text>
                            </Button>
                        </View>
                        <View className="border-t border-border p-4">
                            <Text className="mb-5 text-foreground">
                                Supprimer votre compte est une action irréversible. Cela supprimera vos programmes et
                                votre activité.
                            </Text>
                            <Button
                                variant="destructive"
                                onPress={() => {
                                    Alert.alert(
                                        "Suppression de compte",
                                        "Cette action est irréversible. Vous perdrez toutes vos données.",
                                        [
                                            {
                                                text: "Annuler",
                                                style: "cancel",
                                            },
                                            {
                                                text: "Confirmer",
                                                onPress: () => {
                                                    deleteItemAsync(THEME_KEY);
                                                    onDelete(authState.token);
                                                },
                                                style: "destructive",
                                            },
                                        ],
                                        { cancelable: false },
                                    );
                                }}
                            >
                                <Text className="text-destructive-foreground">Supprimer votre compte</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
