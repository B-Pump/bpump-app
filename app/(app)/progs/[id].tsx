import { useLocalSearchParams } from "expo-router";
import { Star } from "lucide-react-native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";
import { Button } from "@/components/ui/button";

import useFetch from "@/lib/api";
import { useColorScheme } from "@/lib/color";

export default function Progs() {
    const { isDarkColorScheme } = useColorScheme();
    const {
        data: progData,
        isLoading: progLoad,
        error: progError,
        refetch,
    } = useFetch("GET", `progs/${useLocalSearchParams().id}?username=pierre`);
    const { data: exoData, isLoading: exoLoad, error: exoError } = useFetch("GET", "exos/all");

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [setRefreshing, refetch]);

    const tabs = ["Informations", "Liste des exercices"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const displayTabContent = () => {
        switch (activeTab) {
            case tabs[0]:
                return (
                    <View className="my-3">
                        <Text className="mb-3 text-foreground font-medium text-lg">
                            En savoir plus sur ce programme
                        </Text>
                        <View>
                            <Text className="mb-3 text-foreground">📜​ Description :</Text>
                            <Text className="text-foreground">{progData?.description ?? "Aucune données"}</Text>
                        </View>
                    </View>
                );
            case tabs[1]:
                return (
                    <View className="my-3">
                        <Text className="mb-3 text-foreground font-medium text-lg">Catalogue de ce programme</Text>
                        <View>
                            {progData?.exercises?.map((item: string, index: number) => {
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
                                                Erreur lors du chargement des détails de l'exercice
                                            </Text>
                                        ) : exoItem ? (
                                            <View className="py-1">
                                                <ExosCard data={exoItem} load={exoLoad} error={exoError} />
                                            </View>
                                        ) : (
                                            <Text className="text-foreground">
                                                Aucun détail trouvé pour l'exercice {item}
                                            </Text>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                );
            default:
                break;
        }
    };

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
                        <View className="justify-center items-center my-16">
                            <View>{/* Image */}</View>
                            <View className="mt-3">
                                <Text className="text-foreground text-2xl font-medium text-center">
                                    Programme - {progData?.title}
                                </Text>
                            </View>
                            <View className="mt-3 flex-row justify-center items-center">
                                <Text className="text-foreground text-lg">{progData?.category} | </Text>
                                <View className="flex-row justify-center items-center">
                                    <Star size={15} color={isDarkColorScheme ? "white" : "black"} />
                                    <Text className="text-foreground ml-1">{progData?.difficulty}/5</Text>
                                </View>
                            </View>
                        </View>
                        <View className="my-3 justify-center items-center">
                            <FlatList
                                data={tabs}
                                renderItem={({ item, index }) => (
                                    <Button
                                        className={activeTab === item ? "bg-primary" : "bg-secondary"}
                                        variant="ghost"
                                        onPress={() => setActiveTab(item)}
                                        key={index}
                                    >
                                        <Text className={activeTab === item ? "text-accent" : "text-foreground"}>
                                            {item}
                                        </Text>
                                    </Button>
                                )}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item}
                                contentContainerStyle={{ columnGap: 12 }}
                                horizontal
                            />
                        </View>
                        {displayTabContent()}
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
