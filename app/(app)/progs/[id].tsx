import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Star } from "lucide-react-native";
import { useCallback, useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { useAuth } from "@/context/auth";
import useFetch from "@/lib/api";
import { useColorScheme } from "@/lib/color";

export default function Progs() {
    const { isDarkColorScheme } = useColorScheme();
    const { authState } = useAuth();

    const {
        data: progData,
        isLoading: progLoad,
        error: progError,
        refetch,
    }: { data: Progs; isLoading: boolean; error: string; refetch: () => void } = useFetch(
        "GET",
        `progs/${useLocalSearchParams().id}?username=${authState.token}`,
    );
    const { data: exoData, isLoading: exoLoad, error: exoError } = useFetch("GET", "exos/all");

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [setRefreshing, refetch]);

    const tabs = ["Informations", "Liste des exercices"];

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
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
                                            <View>
                                                <Text className="mb-3 text-foreground">📜​ Description :</Text>
                                                <Text className="text-muted-foreground">
                                                    {progData?.description ?? "Aucune données"}
                                                </Text>
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
                                                                    <Text className="text-foreground">
                                                                        Erreur lors du chargement des détails de
                                                                        l'exercice
                                                                    </Text>
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
