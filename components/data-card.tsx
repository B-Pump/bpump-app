import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { ExosSkeletonList, ProgsSkeletonList } from "@/components/data-skeleton";

interface ExosCard {
    data: Exos;
    isLoading: boolean;
    error: boolean;
}
interface ProgsCard {
    data: Progs;
    isLoading: boolean;
    error: boolean;
}

export function ExosCard({ data, isLoading, error }: ExosCard) {
    return (
        <TouchableOpacity
            onPress={() => {
                !error && !isLoading && router.push(`/exos/${data?.id}`);
            }}
        >
            {isLoading ? (
                <ExosSkeletonList count={1} />
            ) : error ? (
                <Text className="text-foreground">Erreur lors du chargement de l'exercice</Text>
            ) : (
                <View className="flex-row rounded-lg border border-border bg-background p-6">
                    <View className="items-center justify-between rounded-xl">
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 10 }}
                            source={data?.icon || "https://urlz.fr/q5qm"}
                            contentFit="fill"
                        />
                    </View>
                    <View className="ml-7 justify-center">
                        <Text className="text-xl font-medium text-foreground" numberOfLines={1}>
                            {data?.title || "Titre non trouvé"}
                        </Text>
                        <Text className="text-sm text-muted-foreground" numberOfLines={1}>
                            {data?.category || "Catégorie non trouvée"} - Niveau{" "}
                            {data?.difficulty || "Difficultée non trouvée"}
                        </Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

export function ProgsCard({ data, isLoading, error }: ProgsCard) {
    return (
        <TouchableOpacity
            onPress={() => {
                !error && !isLoading && router.push(`/progs/${data?.id}`);
            }}
        >
            {isLoading ? (
                <ProgsSkeletonList count={1} />
            ) : error ? (
                <Text className="text-foreground">Erreur lors du chargement du programme</Text>
            ) : (
                <View className="w-[300px] rounded-lg border border-border bg-background p-6">
                    <View className="justify-between rounded-xl">
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 10 }}
                            source={data?.icon || "https://urlz.fr/q5qt"}
                            contentFit="fill"
                        />
                    </View>
                    <View className="mt-5">
                        <Text className="text-muted-foreground" numberOfLines={1}>
                            {data?.description || "Description non trouvée"}
                        </Text>
                    </View>
                    <View className="mt-5">
                        <Text className="text-xl font-medium text-foreground" numberOfLines={1}>
                            {data?.title || "Titre non trouvé"}
                        </Text>
                        <Text className="text-sm text-muted-foreground" numberOfLines={1}>
                            {data?.category || "Catégorie non trouvée"} - Niveau{" "}
                            {data?.difficulty || "Difficultée non trouvée"}
                        </Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}
