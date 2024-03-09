import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { ExosCard, ProgsCard } from "@/components/data-card";
import { CategorySkeletonList, ExosSkeletonList, ProgsSkeletonList } from "@/components/data-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession } from "@/context/auth";
import useFetch from "@/lib/api";
import { useColorScheme } from "@/lib/color";

export default function App() {
    const { session } = useSession();
    const { isDarkColorScheme } = useColorScheme();

    const [searchTerm, setSearchTerm] = useState("");

    const { data: exosData, isLoading: exosLoad, error: exosError } = useFetch("GET", "exos/all");
    const { data: progsData, isLoading: progsLoad, error: progsError } = useFetch("GET", "progs/all?username=pierre");

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View className="mt-3">
                        <Text className="text-2xl text-foreground">
                            Bonjour, {session ? session.charAt(0).toUpperCase() + session.slice(1) : "je suis B-Pump"} !
                        </Text>
                        <Text className="text-3xl font-semibold leading-tight text-foreground">
                            Trouvez votre programme d'entraînement parfait !
                        </Text>
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
                                if (searchTerm && /[a-zA-Z]/.test(searchTerm.trim()))
                                    // check if this is not an empty search
                                    router.push(`/search/${searchTerm}`);
                            }}
                        >
                            <Search color={isDarkColorScheme ? "black" : "white"} />
                        </Button>
                    </View>
                    <View className="my-3">
                        {exosLoad ? (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={[1, 2, 3, 4]}
                                renderItem={() => <CategorySkeletonList count={4} />}
                                keyExtractor={(item) => item.toString()}
                                contentContainerStyle={{ columnGap: 10 }}
                                horizontal
                            />
                        ) : exosError ? (
                            <Text className="text-foreground">{exosError}</Text>
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
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => router.push(`/search/${item}`)} key={index}>
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
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-semibold text-foreground">Programmes recommandés</Text>
                        <Button variant="ghost" onPress={() => router.push("/progs/create")}>
                            <Text className="font-medium text-muted-foreground">Créer</Text>
                        </Button>
                    </View>
                    <View>
                        {progsLoad ? (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={[1, 2]}
                                renderItem={() => <ProgsSkeletonList count={1} />}
                                keyExtractor={(item) => item.toString()}
                                contentContainerStyle={{ columnGap: 7 }}
                                horizontal
                            />
                        ) : progsError ? (
                            <Text className="text-foreground">{progsError}</Text>
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
                <View className="my-3 flex-1">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-semibold text-foreground">Exercices recommandés</Text>
                        <Button variant="ghost" onPress={() => router.push("/exos/showall")}>
                            <Text className="font-medium text-muted-foreground">Afficher tout</Text>
                        </Button>
                    </View>
                    <View>
                        {exosLoad ? (
                            <ExosSkeletonList count={2} />
                        ) : exosError ? (
                            <Text className="text-foreground">{exosError}</Text>
                        ) : (
                            exosData
                                ?.sort(() => Math.random() - 0.5)
                                .slice(0, 3)
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
