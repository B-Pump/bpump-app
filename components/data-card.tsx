import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { ExosSkeleton, ProgsSkeleton } from "@/components/data-skeleton";
import { Image } from "expo-image";

export function ExosCard({ data, load, error }: { data: Exos; load: boolean; error: string }) {
    return (
        <TouchableOpacity
            onPress={() => {
                !error && !load ? router.push(`/exos/${data?.id}`) : {};
            }}
        >
            {load ? (
                <ExosSkeleton />
            ) : error ? (
                <Text className="text-foreground">{error}</Text>
            ) : (
                <View className="flex-row rounded-lg border border-border p-7">
                    <View className="items-center justify-between rounded-xl bg-secondary">
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 10 }}
                            source="https://a4.pbase.com/o6/02/1001402/1/149560233.6rKKlAVp.201302HKG_Lantau0005aa2.jpg"
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
                <ProgsSkeleton />
            ) : error ? (
                <Text className="text-foreground">{error}</Text>
            ) : (
                <View className="rounded-lg border border-border p-7">
                    <View>{/* Image */}</View>
                    <Text className="text-muted-foreground" numberOfLines={1}>
                        {data?.description || "Description non trouvée"}
                    </Text>
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
