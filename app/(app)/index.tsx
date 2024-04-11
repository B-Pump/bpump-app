import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ExosCard, ProgsCard } from "@/components/data-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { useAuth } from "@/context/auth";
import { useDataStore } from "@/context/data";
import { useFetch } from "@/lib/api";
import { useColorScheme } from "@/lib/color";

interface ExosFetch {
    data: ExoItem[];
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}
interface ProgsFetch {
    data: ProgItem[];
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

export default function App() {
    const { exos, progs, setExos, setProgs } = useDataStore();
    const { token } = useAuth();
    const { isDarkColorScheme } = useColorScheme();

    const [searchTerm, setSearchTerm] = useState<string>(null);

    const {
        data: exosData,
        isLoading: exosLoad,
        error: exosError,
        refetch: exosRefetch,
    }: ExosFetch = useFetch("GET", "exos/all");
    const {
        data: progsData,
        isLoading: progsLoad,
        error: progsError,
        refetch: progsRefetch,
    }: ProgsFetch = useFetch("GET", `progs/all?username=${token}`);

    useEffect(() => {
        setExos(exosData);
        setProgs(progsData);
    }, [exosData, progsData]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        exosRefetch();
        progsRefetch();
        setRefreshing(false);
    }, [setRefreshing, exosRefetch]);

    const sayHello = () => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18 ? "Bonjour" : "Bonsoir";
    };

    // const test = {
    //     message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit, est.",
    //     data: [
    //         { value: 0, label: "0s" },
    //         { value: 10, label: "1s" },
    //         { value: 35, label: "2s" },
    //         { value: 60, label: "3s" },
    //         { value: 5, label: "4s" },
    //         { value: 10, label: "5s" },
    //         { value: 35, label: "6s" },
    //     ],
    // };

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View>
                    <View className="mt-3">
                        <Text className="text-2xl text-foreground">
                            {sayHello()} {token && token.charAt(0).toUpperCase() + token.slice(1)} !
                        </Text>
                        <Text className="text-3xl font-semibold leading-tight text-foreground">
                            Trouvez votre programme d'entraînement parfait !
                        </Text>
                        {/* <Button
                            variant="secondary"
                            onPress={() => {
                                router.push({ pathname: "/exos/result", params: { data: JSON.stringify(test) } });
                            }}
                        >
                            <Text>Stats</Text>
                        </Button> */}
                    </View>
                    <View className="my-3 flex flex-row items-center justify-center">
                        <View className="mr-3 flex-1">
                            <Input
                                value={searchTerm}
                                onChangeText={(text) => setSearchTerm(text)}
                                placeholder="Que recherchez vous ?"
                            />
                        </View>
                        <Button
                            variant="default"
                            size="icon_lg"
                            onPress={() => {
                                if (searchTerm) router.push(`/search/${searchTerm}`);
                            }}
                        >
                            <Search color={isDarkColorScheme ? "black" : "white"} />
                        </Button>
                    </View>
                    <View className="my-3">
                        {exosLoad ? (
                            <View className="flex-row">
                                <>
                                    {Array.from({ length: 4 }).map((_, index: number) => (
                                        <Skeleton key={index} className="mr-2 h-8 w-28 rounded-full" />
                                    ))}
                                </>
                            </View>
                        ) : exosError ? (
                            <Text className="text-foreground">
                                Erreur lors du chargement des badges de recherche. Redémarrer l'application devrait
                                résoudre ce problème.
                            </Text>
                        ) : (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={[
                                    "Quadriceps",
                                    "Ischio-jambiers",
                                    "Pectoraux",
                                    "Deltoides",
                                    "Abdominaux",
                                    "Biceps",
                                    "Triceps",
                                    "Dos",
                                ]}
                                renderItem={({ item, index }: { item: string; index: number }) => (
                                    <TouchableOpacity onPress={() => router.push(`/search/${item}`)} key={index}>
                                        <Badge label={item} variant="outline" />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.toLowerCase()}
                                contentContainerStyle={{ columnGap: 10 }}
                                horizontal
                            />
                        )}
                    </View>
                </View>
                <View className="my-3">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-semibold text-foreground">Vos programmes</Text>
                        <Button variant="ghost" onPress={() => router.push("/progs/create")}>
                            <Text className="font-medium text-muted-foreground">Créer</Text>
                        </Button>
                    </View>
                    <View>
                        {progsLoad ? (
                            <View className="flex-row">
                                <>
                                    {Array.from({ length: 2 }).map((_, index: number) => (
                                        <View key={index} className="mr-2">
                                            <View className="w-[300px] rounded-lg border border-border p-6">
                                                <View className="justify-between rounded-xl">
                                                    <Skeleton className="size-14" />
                                                </View>
                                                <View className="mt-5">
                                                    <Skeleton className="h-5 w-[250px]" />
                                                </View>
                                                <View className="mt-5">
                                                    <Skeleton className="mb-3 h-5 w-[120px]" />
                                                    <Skeleton className="h-5 w-[100px]" />
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </>
                            </View>
                        ) : progsError ? (
                            <Text className="text-foreground">
                                Erreur lors du chargement des programmes. Redémarrer l'application devrait résoudre ce
                                problème.
                            </Text>
                        ) : (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={progs}
                                renderItem={({ item, index }: { item: ProgItem; index: number }) => (
                                    <ProgsCard data={item} key={index} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={{ columnGap: 7 }}
                                horizontal
                            />
                        )}
                    </View>
                </View>
                <View className="my-3 flex-1">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-semibold text-foreground">Exercices recommandés</Text>
                        <Button variant="ghost" onPress={() => router.push("/exos/showall")}>
                            <Text className="font-medium text-muted-foreground">Afficher tout</Text>
                        </Button>
                    </View>
                    <View>
                        {exosLoad ? (
                            <>
                                {Array.from({ length: 2 }).map((_, index: number) => (
                                    <View key={index} className="my-1">
                                        <View className="flex-row rounded-lg border border-border p-6">
                                            <View className="items-center justify-between rounded-xl">
                                                <Skeleton className="size-14" />
                                            </View>
                                            <View className="ml-7 justify-center">
                                                <Skeleton className="mb-3 h-5 w-[120px]" />
                                                <Skeleton className="h-5 w-[100px]" />
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </>
                        ) : exosError ? (
                            <Text className="text-foreground">
                                Erreur lors du chargement des exercices. Redémarrer l'application devrait résoudre ce
                                problème.
                            </Text>
                        ) : (
                            exos
                                ?.sort(() => Math.random() - 0.5)
                                .slice(0, 3)
                                .map((item: ExoItem, index: number) => (
                                    <View className="py-1" key={index}>
                                        <ExosCard data={item} />
                                    </View>
                                ))
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
