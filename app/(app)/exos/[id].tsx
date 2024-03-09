import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Star } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Button } from "@/components/ui/button";

import useFetch from "@/lib/api";
import { useColorScheme } from "@/lib/color";

export default function Exos() {
    const { isDarkColorScheme } = useColorScheme();
    const { data, isLoading, error, refetch }: { data: Exos; isLoading: boolean; error: string; refetch: () => void } =
        useFetch("GET", `exos/${useLocalSearchParams().id}`);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [setRefreshing, refetch]);

    const tabs = ["Informations", "Démonstration"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const videoRef = useRef(null);
    const [video, setVideo] = useState({});

    const styles = StyleSheet.create({
        video: {
            alignSelf: "center",
            width: "100%",
            height: 200,
            borderRadius: 15,
        },
    });

    const displayTabContent = () => {
        switch (activeTab) {
            case tabs[0]:
                return (
                    <View className="my-3">
                        <Text className="mb-3 text-lg font-medium text-foreground">
                            En savoir plus sur ce programme
                        </Text>
                        <View className="my-2">
                            <Text className="mb-3 text-foreground">📜​ Description :</Text>
                            <Text className="text-muted-foreground">{data?.sugar.description ?? "Aucune données"}</Text>
                        </View>
                        <View className="my-2">
                            <Text className="mb-3 text-foreground">💪🏻​​ Muscles sollicités :</Text>
                            {data?.sugar?.muscles?.map((item, index) => (
                                <Text className="text-muted-foreground" key={index}>
                                    {"\u2022 "}
                                    {item ?? "Aucune données"}
                                </Text>
                            ))}
                        </View>
                        <View className="my-2">
                            <Text className="mb-3 text-foreground">🔐​ Consignes de sécurité :</Text>
                            {data?.sugar?.security?.map((item, index) => (
                                <Text className="text-muted-foreground" key={index}>
                                    {"\u2022 "}
                                    {item ?? "Aucune données"}
                                </Text>
                            ))}
                        </View>
                        <View className="my-2">
                            <Text className="mb-3 text-foreground">🏋️ Préréquis :</Text>
                            {data?.sugar?.needed?.map((item, index) => (
                                <Text className="text-muted-foreground" key={index}>
                                    {"\u2022 "}
                                    {item ?? "Aucune données"}
                                </Text>
                            ))}
                        </View>
                        <View className="my-2">
                            <Text className="mb-3 text-foreground">🤸​ Dépenses énergétiques :</Text>
                            <Text className="text-muted-foreground">
                                Calories brulées pour 10 reps : {data?.sugar.energetic.calories ?? "Aucune donnée"} kcal
                            </Text>
                        </View>
                    </View>
                );
            case tabs[1]:
                return (
                    <View className="my-3">
                        <Text className="mb-3 text-lg font-medium text-foreground">Comment faire cet exercice</Text>
                        <View className="my-2">
                            <Text className="mb-3 text-foreground">📹​ Vidéo :</Text>
                            <Video
                                ref={videoRef}
                                source={{
                                    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                                }}
                                style={styles.video}
                                useNativeControls
                                resizeMode={ResizeMode.COVER}
                                onPlaybackStatusUpdate={(status) => setVideo(() => status)}
                            />
                        </View>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color={isDarkColorScheme ? "white" : "black"} />
                ) : error ? (
                    <Text className="text-foreground">{error}</Text>
                ) : (
                    <>
                        <View className="my-16 items-center justify-center">
                            <View className="items-center justify-between rounded-xl">
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 10 }}
                                    source="https://cdn.pixabay.com/photo/2017/05/25/15/08/jogging-2343558_1280.jpg"
                                    contentFit="fill"
                                />
                            </View>
                            <View className="mt-3">
                                <Text className="text-center text-2xl font-medium text-foreground">
                                    Exercice - {data?.sugar?.title}
                                </Text>
                            </View>
                            <View className="mt-3 flex-row items-center justify-center">
                                <Text className="text-lg text-foreground">{data?.sugar?.category} | </Text>
                                <View className="flex-row items-center justify-center">
                                    <Star size={15} color={isDarkColorScheme ? "white" : "black"} />
                                    <Text className="ml-1 text-foreground">{data?.sugar?.difficulty}/5</Text>
                                </View>
                            </View>
                        </View>
                        <View className="my-3 items-center justify-center">
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
                    <Text className="text-accent">Démarrer l'exercice</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
