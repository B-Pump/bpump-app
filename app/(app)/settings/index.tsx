import { deviceName, osInternalBuildId } from "expo-device";
import { router } from "expo-router";
import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { Alert, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/auth";
import { useSocket } from "@/context/socket";
import { THEME_KEY, useColorScheme } from "@/lib/color";

import { expo as cfV } from "@/app.json";

interface Theme {
    value: "dark" | "system" | "light";
    label: string;
}
interface Info {
    value: string;
    label: string;
}

/**
 * Page where users can configure the application and their account
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function Settings(): React.JSX.Element {
    const { logout, remove, token } = useAuth();
    const { disconnect, socketValid, socketAdress } = useSocket();

    const { setColorScheme, colorScheme } = useColorScheme();

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
                            {socketValid ? ( // If user is connected to a socket server, display a button to disconnect from the server
                                <>
                                    <Text className="mb-5 text-foreground">
                                        Vous êtes actuellement connecté à l'addresse : {"\n" + socketAdress}
                                    </Text>
                                    <Button variant="outline" onPress={disconnect}>
                                        <Text className="text-foreground">Déconnexion</Text>
                                    </Button>
                                </>
                            ) : (
                                // Else, display a button to connect to a server
                                <>
                                    <Text className="mb-5 text-foreground">
                                        Connectez votre robot en scannant un code QR que vous pouvez retrouver sur la
                                        projection à l'allumage du robot.
                                    </Text>
                                    <Button variant="outline" onPress={() => router.push("/settings/scan")}>
                                        <Text className="text-foreground">Scanner le code QR</Text>
                                    </Button>
                                </>
                            )}
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
                                        setItemAsync(THEME_KEY, item.value); // Save the chosen theme to apply it the next time he open the app
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
                    <Text className="mb-3 text-foreground">🏋️ Renseigner votre métabolisme</Text>
                    <View className="rounded-lg border border-border">
                        <View className="p-4">
                            <Text className="mb-5 text-foreground">
                                Vous pouvez renseigner certaines informations sur votre poids, taille, âge et sexe afin
                                d'avoir un suivi sur vos calories dépensées à la fin de chaque exercice en allant sur
                                notre site dans la rubrique 'Dashboard'.
                            </Text>
                            <Button variant="outline" onPress={() => Linking.openURL("https://b-pump.fr/account")}>
                                <Text className="text-foreground">Aller sur le site</Text>
                            </Button>
                        </View>
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
                                    deleteItemAsync(THEME_KEY); // Reset the current selected theme
                                    logout();
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
                                                    deleteItemAsync(THEME_KEY); // Reset the current selected theme
                                                    remove(token);
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
