import axios from "axios";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Settings2, Star } from "lucide-react-native";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";

import { CreateCard } from "@/components/data-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { useAuth } from "@/context/auth";
import { useDataStore } from "@/context/data";
import { useSocket } from "@/context/socket";
import { API_URL } from "@/lib/api";
import { useColorScheme } from "@/lib/color";

/**
 * Page displaying the contents of a program based on its ID
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function Progs(): React.JSX.Element {
    const { exos, progs, metabolism } = useDataStore();
    const progData = progs.find((prog: ProgItem) => prog.id === useLocalSearchParams().id);

    const { token } = useAuth();
    const { socketValid, socketInstance } = useSocket();
    const { id } = useLocalSearchParams();
    const { isDarkColorScheme } = useColorScheme();

    const tabs: string[] = ["Informations", "Liste des exercices"];

    const removeProg = async () => {
        try {
            await axios.delete(`${API_URL}/remove_program?username=${token}&id=${id}`);
            router.back();
        } catch (error) {
            console.warn("Error while deleting program :", error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <Stack.Screen
                options={{
                    animation: "fade_from_bottom",
                    headerLeft: () => (
                        <Button variant="secondary" size="icon_sm" onPress={() => router.back()}>
                            <ArrowLeft color={isDarkColorScheme ? "white" : "black"} />
                        </Button>
                    ),
                    headerRight:
                        typeof id === "string" && !id.startsWith("default_")
                            ? () => (
                                  <Button
                                      variant="secondary"
                                      size="icon_sm"
                                      onPress={() => {
                                          Alert.alert(
                                              "Supprimer ce programme ?",
                                              "Vous devrez par la suite rafraîchir la page.",
                                              [
                                                  {
                                                      text: "Annuler",
                                                      style: "cancel",
                                                  },
                                                  {
                                                      text: "Confirmer",
                                                      onPress: removeProg,
                                                      style: "destructive",
                                                  },
                                              ],
                                              { cancelable: false },
                                          );
                                      }}
                                  >
                                      <Settings2 color={isDarkColorScheme ? "white" : "black"} />
                                  </Button>
                              )
                            : null,
                    headerShadowVisible: false,
                    title: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="my-16 items-center justify-center">
                    <View className="items-center justify-between rounded-xl">
                        <Image
                            style={{ width: 70, height: 70, borderRadius: 10 }}
                            source={progData?.icon || "https://urlz.fr/q5qt"}
                            contentFit="fill"
                        />
                    </View>
                    <View className="mt-3">
                        <Text className="text-center text-2xl font-medium text-foreground">
                            Programme - {progData?.title}
                        </Text>
                    </View>
                    <View className="mt-3 flex-row items-center justify-center">
                        <Text className="text-lg text-foreground">{progData?.category} | </Text>
                        <View className="flex-row items-center justify-center">
                            <Star size={15} color={isDarkColorScheme ? "white" : "black"} />
                            <Text className="ml-1 text-foreground">{progData?.difficulty}/5</Text>
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
                                            En savoir plus sur ce programme
                                        </Text>
                                        <View className="my-2">
                                            <Text className="mb-3 text-foreground">📜​ Description :</Text>
                                            <Text className="text-muted-foreground">
                                                {progData?.description ?? "Aucune données"}
                                            </Text>
                                        </View>
                                        <View className="my-2">
                                            <Text className="mb-3 text-foreground">🔎 Conseils :</Text>
                                            {progData?.hint?.map((item: string, index: number) => (
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
                                            Catalogue de ce programme
                                        </Text>
                                        <View>
                                            {progData?.exercises?.map((item: string, index: number) => {
                                                const exoItem = exos.find((exo: ExoItem) => exo.id === item);
                                                const rest = progData?.rest[index] || 0;
                                                const reps = progData?.reps[index] || 0;

                                                return (
                                                    <View key={index}>
                                                        {exoItem && (
                                                            <View className="py-1">
                                                                <CreateCard
                                                                    icon={exoItem.icon}
                                                                    title={exoItem.title + " - " + reps + " reps"}
                                                                />
                                                            </View>
                                                        )}
                                                        {rest > 0 && (
                                                            <View className="py-1">
                                                                <CreateCard
                                                                    icon="https://i.imgur.com/ieQPqYc.png"
                                                                    title={"Repos - " + rest.toString() + " sec"}
                                                                />
                                                            </View>
                                                        )}
                                                    </View>
                                                );
                                            })}
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
                            if (socketInstance) {
                                const data_list = [];

                                progData?.exercises?.forEach((item: string, index: number) => {
                                    const exoItem = exos.find((exo) => exo.id === item);
                                    const rest = progData?.rest[index] || 0;
                                    const reps = progData?.reps[index] || 0;

                                    if (exoItem) {
                                        // Create a copy of the exoItem object so as not to modify it directly
                                        const updatedExoItem = { ...exoItem, rest, reps };
                                        data_list.push(updatedExoItem);
                                    }
                                });
                                socketInstance.emit("start_program", {
                                    data: data_list,
                                    metabolism: metabolism,
                                });
                            }
                        } else router.push("/settings/scan");
                    }}
                >
                    <Text className="text-accent">Démarrer le programme</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
