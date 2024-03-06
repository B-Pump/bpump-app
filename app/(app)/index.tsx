import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ExosCard, ProgsCard } from "@/components/data-card";
import { CategorySkeleton, ExosSkeleton, ProgsSkeleton } from "@/components/data-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession } from "@/context/auth";
import useFetch from "@/lib/api";
import { useColorScheme } from "@/lib/color";

export default function App() {
    const { session } = useSession();
    const { isDarkColorScheme } = useColorScheme();

    const { data: exosData, isLoading: exosLoad, error: exosError } = useFetch("GET", "exos/all");
    const { data: progsData, isLoading: progsLoad, error: progsError } = useFetch("GET", "progs/all?username=pierre");

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View className="mt-3">
                        <Text className="text-foreground text-2xl">
                            Bonjour, {session ? session.charAt(0).toUpperCase() + session.slice(1) : "je suis B-Pump"} !
                        </Text>
                        <Text className="text-foreground text-3xl font-semibold leading-tight">
                            Trouvez votre programme d'entraînement parfait !
                        </Text>
                    </View>
                    <View className="my-3 flex flex-row justify-center items-center">
                        <View className="flex-1 mr-3">
                            <Input placeholder="Que recherchez vous ?" />
                        </View>
                        <Button variant="default" size="icon_lg">
                            <Search color={isDarkColorScheme ? "black" : "white"} />
                        </Button>
                    </View>
                    <View className="my-3">
                        {exosLoad ? (
                            <CategorySkeleton />
                        ) : exosError ? (
                            <Text>{exosError}</Text>
                        ) : (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={
                                    exosData
                                        ? ([...new Set(exosData.map((item: Exos) => item.sugar.category))] as string[])
                                        : []
                                }
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => router.push(`search/${item}`)} key={index}>
                                        <Badge label={item} variant="outline" />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.toString()}
                                contentContainerStyle={{ columnGap: 10 }}
                                horizontal
                            />
                        )}
                    </View>
                </View>
                <View className="my-3">
                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-foreground text-xl font-semibold">Programmes recommandés</Text>
                        <Button variant="ghost" onPress={() => router.push("/progs/create")}>
                            <Text className="text-muted-foreground font-medium">Créer</Text>
                        </Button>
                    </View>
                    <View>
                        {progsLoad ? (
                            <ProgsSkeleton />
                        ) : progsError ? (
                            <Text>{progsError}</Text>
                        ) : (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={progsData}
                                renderItem={({ item, index }: { item: Progs; index: number }) => (
                                    <ProgsCard data={item} load={progsLoad} error={progsError} key={index} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                contentContainerStyle={{ columnGap: 7 }}
                                horizontal
                            />
                        )}
                    </View>
                </View>
                <View className="my-3">
                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-foreground text-xl font-semibold">Exercices recommandés</Text>
                        <Button variant="ghost" onPress={() => router.push("/exos/showall")}>
                            <Text className="text-muted-foreground font-medium">Afficher tout</Text>
                        </Button>
                    </View>
                    <View>
                        {exosLoad ? (
                            <ExosSkeleton />
                        ) : exosError ? (
                            <Text>{exosError}</Text>
                        ) : (
                            exosData
                                ?.sort(() => Math.random() - 0.5)
                                .slice(0, 2)
                                .map((item: Exos, index: number) => (
                                    <View className="py-1" key={index}>
                                        <ExosCard data={item} load={exosLoad} error={exosError} />
                                    </View>
                                ))
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
