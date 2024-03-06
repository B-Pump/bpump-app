import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { ExosSkeleton, ProgsSkeleton } from "@/components/data-skeleton";

export function ExosCard({ data, load, error }: { data: Exos; load: boolean; error: string }) {
    return (
        <TouchableOpacity onPress={() => router.push(`/exos/${data?.id}`)}>
            {load ? (
                <ExosSkeleton />
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <View className="rounded-lg border border-border p-7">
                    <View>{/* Image */}</View>
                    <View className="mt-5">
                        <Text className="text-foreground text-xl font-medium" numberOfLines={1}>
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
        <TouchableOpacity onPress={() => router.push(`/progs/${data?.id}`)}>
            {load ? (
                <ProgsSkeleton />
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <View className="rounded-lg border border-border p-7">
                    <View>{/* Image */}</View>
                    <Text className="text-muted-foreground" numberOfLines={1}>
                        {data?.description || "Description non trouvée"}
                    </Text>
                    <View className="mt-5">
                        <Text className="text-foreground text-xl font-medium" numberOfLines={1}>
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
