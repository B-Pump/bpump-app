import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Star } from "lucide-react-native";
import { useRef } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { useDataStore } from "@/context/data";
import { useSocket } from "@/context/socket";
import { useColorScheme } from "@/lib/color";

/**
 * Page displaying the contents of an exercise based on its ID
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function Exos(): React.JSX.Element {
    const { exos, metabolism } = useDataStore();
    const exoData = exos.find((exo: ExoItem) => exo.id === useLocalSearchParams().id);

    const { socketValid, socketInstance } = useSocket();
    const { isDarkColorScheme } = useColorScheme();

    const tabs: string[] = ["Informations", "Démonstration"];

    const videoRef = useRef(null);

    const styles = StyleSheet.create({
        video: {
            alignSelf: "center",
            width: "100%",
            height: 200,
            borderRadius: 15,
        },
    });

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="my-16 items-center justify-center">
                    <View className="items-center justify-between rounded-xl">
                        <Image
                            style={{ width: 70, height: 70, borderRadius: 10 }}
                            source={exoData?.icon || "https://urlz.fr/q5qm"}
                            contentFit="fill"
                        />
                    </View>
                    <View className="mt-3">
                        <Text className="text-center text-2xl font-medium text-foreground">
                            Exercice - {exoData?.title}
                        </Text>
                    </View>
                    <View className="mt-3 flex-row items-center justify-center">
                        <Text className="text-lg text-foreground">{exoData?.category} | </Text>
                        <View className="flex-row items-center justify-center">
                            <Star size={15} color={isDarkColorScheme ? "white" : "black"} />
                            <Text className="ml-1 text-foreground">{exoData?.difficulty}/5</Text>
                        </View>
                    </View>
                </View>
                <Tabs defaultValue={tabs[0]}>
                    <>
                        <TabsTrigger data={tabs} />
                        {tabs.map((tab: string, index: number) => (
                            <TabsContent value={tab} key={index}>
                                {tab === tabs[0] ? (
                                    <View className="my-3">
                                        <Text className="mb-3 text-lg font-medium text-foreground">
                                            En savoir plus sur cet exercice
                                        </Text>
                                        <View className="my-2">
                                            <Text className="mb-3 text-foreground">📜​ Description :</Text>
                                            <Text className="text-muted-foreground">
                                                {exoData?.description ?? "Aucune données"}
                                            </Text>
                                        </View>
                                        <View className="my-2">
                                            <Text className="mb-3 text-foreground">💪🏻​​ Muscles sollicités :</Text>
                                            {exoData?.muscles?.map((item: string, index: number) => (
                                                <Text className="text-muted-foreground" key={index}>
                                                    {"\u2022 "}
                                                    {item ?? "Aucune données"}
                                                </Text>
                                            ))}
                                        </View>
                                        <View className="my-2">
                                            <Text className="mb-3 text-foreground">🔐​ Consignes de sécurité :</Text>
                                            {exoData?.security?.map((item: string, index: number) => (
                                                <Text className="text-muted-foreground" key={index}>
                                                    {"\u2022 "}
                                                    {item ?? "Aucune données"}
                                                </Text>
                                            ))}
                                        </View>
                                        <View className="my-2">
                                            <Text className="mb-3 text-foreground">🏋️ Préréquis :</Text>
                                            {exoData?.needed?.map((item: string, index: number) => (
                                                <Text className="text-muted-foreground" key={index}>
                                                    {"\u2022 "}
                                                    {item ?? "Aucune données"}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                ) : tab === tabs[1] ? (
                                    <View className="my-3">
                                        <Text className="mb-3 text-lg font-medium text-foreground">
                                            Comment faire cet exercice
                                        </Text>
                                        <View className="my-2">
                                            <Text className="mb-3 text-foreground">📹​ Vidéo :</Text>
                                            <Video
                                                ref={videoRef}
                                                source={{
                                                    uri: exoData?.video || "https://urlz.fr/q5e8",
                                                }}
                                                style={styles.video}
                                                useNativeControls
                                                isLooping
                                                resizeMode={ResizeMode.COVER} // TODO: update mode to CONTAiN on fullscreen
                                            />
                                        </View>
                                    </View>
                                ) : null}
                            </TabsContent>
                        ))}
                    </>
                </Tabs>
            </ScrollView>
            <View className="py-3">
                <Button
                    onPress={() => {
                        if (socketValid) {
                            if (socketValid && socketInstance) {
                                socketInstance.emit("start_exo", {
                                    data: exoData,
                                    metabolism: metabolism,
                                });
                            }
                        } else router.push("/settings/scan");
                    }}
                >
                    <Text className="text-accent">Démarrer l'exercice</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
