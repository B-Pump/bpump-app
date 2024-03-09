import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { ExosSkeletonList, ProgsSkeletonList } from "@/components/data-skeleton";

export function ExosCard({ data, load, error }: { data: Exos; load: boolean; error: string }) {
    return (
        <TouchableOpacity
            onPress={() => {
                !error && !load ? router.push(`/exos/${data?.id}`) : {};
            }}
        >
            {load ? (
                <ExosSkeletonList count={1} />
            ) : error ? (
                <Text className="text-foreground">{error}</Text>
            ) : (
                <View className="flex-row rounded-lg border border-border p-6">
                    <View className="items-center justify-between rounded-xl">
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 10 }}
                            source="https://cdn.pixabay.com/photo/2017/05/25/15/08/jogging-2343558_1280.jpg"
                            contentFit="fill"
                        />
                    </View>
                    <View className="ml-7 justify-center">
                        <Text className="text-xl font-medium text-foreground" numberOfLines={1}>
                            {data?.sugar?.title || "Titre non trouvé"}
                        </Text>
                        <Text className="text-sm text-muted-foreground" numberOfLines={1}>
                            {data?.sugar?.category || "Catégorie non trouvée"} - Niveau{" "}
                            {data?.sugar?.difficulty || "Difficultée non trouvée"}
                        </Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

export function ProgsCard({ data, load, error }: { data: Progs; load: boolean; error: string }) {
    return (
        <TouchableOpacity
            onPress={() => {
                !error && !load ? router.push(`/progs/${data?.id}`) : {};
            }}
        >
            {load ? (
                <ProgsSkeletonList count={1} />
            ) : error ? (
                <Text className="text-foreground">{error}</Text>
            ) : (
                <View className="w-[300px] rounded-lg border border-border p-6">
                    <View className="justify-between rounded-xl">
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 10 }}
                            source="https://cdn.pixabay.com/photo/2014/11/17/13/17/crossfit-534615_1280.jpg"
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
