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
import useFetch, { API_URL } from "@/lib/api";
import { useColorScheme } from "@/lib/color";

export default function Progs() {
    const { id } = useLocalSearchParams();
    const { isDarkColorScheme } = useColorScheme();
    const { authState } = useAuth();

    const {
        data: progData,
        isLoading: progLoad,
        error: progError,
        refetch,
    }: { data: Progs; isLoading: boolean; error: string; refetch: () => void } = useFetch(
        "GET",
        `progs/${id}?username=${authState.token}`,
    );
    const { data: exoData, isLoading: exoLoad, error: exoError } = useFetch("GET", "exos/all");

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [setRefreshing, refetch]);

    const tabs = ["Informations", "Liste des exercices"];

    const removeProg = async () => {
        try {
            await axios.delete(`${API_URL}/remove_program?username=${authState.token}&id=${id}`);
            router.back();
        } catch (error) {
            console.error(error);
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
                        id !== "default_1" && id !== "default_2"
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
                    <Text className="text-foreground">{progError}</Text>
                ) : (
                    <>
                        <View className="my-16 items-center justify-center">
                            <View className="items-center justify-between rounded-xl">
                                <Image
                                    style={{ width: 70, height: 70, borderRadius: 10 }}
                                    source="https://cdn.pixabay.com/photo/2014/11/17/13/17/crossfit-534615_1280.jpg"
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
                            {tabs.map((tab, index) => (
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
                                                {progData?.hint?.map((item, index) => (
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
                                                {progData?.exercises?.map((item, index) => {
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
                                                                    <Text className="text-foreground">{exoError}</Text>
                                                                ) : exoItem ? (
                                                                    <View className="py-1">
                                                                        <ExosCard
                                                                            data={exoItem}
                                                                            load={exoLoad}
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
                <Button>
                    <Text className="text-accent">Démarrer le programme</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
