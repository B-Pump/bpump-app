import axios from "axios";
import { Image } from "expo-image";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Settings2, Star } from "lucide-react-native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { useAuth } from "@/context/auth";
import { useRobot } from "@/context/robot";
import useFetch, { API_URL } from "@/lib/api";
import { useColorScheme } from "@/lib/color";

interface UniqueProg {
    data: Progs;
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

export default function Progs() {
    const { authState } = useAuth();
    const { robotState } = useRobot();
    const { id } = useLocalSearchParams();
    const { isDarkColorScheme } = useColorScheme();

    const {
        data: progData,
        isLoading: progLoad,
        error: progError,
        refetch,
    }: UniqueProg = useFetch("GET", `progs/${id}?username=${authState.token}`);
    const { data: exoData, isLoading: exoLoad, error: exoError }: ExosData = useFetch("GET", "exos/all");

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [setRefreshing, refetch]);

    const tabs: string[] = ["Informations", "Liste des exercices"];

    const removeProg = async () => {
        try {
            await axios.delete(`${API_URL}/remove_program?username=${authState.token}&id=${id}`);
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {progLoad ? (
                    <ActivityIndicator size="large" color={isDarkColorScheme ? "white" : "black"} />
                ) : progError ? (
                    <Text className="text-foreground">Erreur lors du chargement des détails de ce programme</Text>
                ) : (
                    <>
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
                                                    if (exoData) {
                                                        const exoItem = exoData.find((exo: Exos) => exo.id === item);

                                                        return (
                                                            <View key={index}>
                                                                {exoLoad ? (
                                                                    <ActivityIndicator
                                                                        size="large"
                                                                        color={isDarkColorScheme ? "white" : "black"}
                                                                    />
                                                                ) : exoError ? (
                                                                    <Text className="text-foreground">
                                                                        Erreur lors du chargement de l'exercice
                                                                    </Text>
                                                                ) : exoItem ? (
                                                                    <View className="py-1">
                                                                        <ExosCard
                                                                            data={exoItem}
                                                                            isLoading={exoLoad}
                                                                            error={exoError}
                                                                        />
                                                                    </View>
                                                                ) : (
                                                                    <Text className="text-foreground">
                                                                        Aucun détail trouvé pour l'exercice "{item}"...
                                                                    </Text>
                                                                )}
                                                            </View>
                                                        );
                                                    }
                                                })}
                                            </View>
                                        </View>
                                    ) : null}
                                </TabsContent>
                            ))}
                        </Tabs>
                    </>
                )}
            </ScrollView>
            <View className="py-3">
                <Button
                    onPress={() => {
                        if (robotState.connected) {
                            // TODO: start prog
                        } else router.push("/settings/scan");
                    }}
                >
                    <Text className="text-accent">Démarrer le programme</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
