import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

/**
 * Component giving a small map based on information about an exercise
 * @author wiizz
 * @param {ExoItem} data {@link ExoItem ExoItem}
 * @returns {React.JSX.Element}
 */
export function ExosCard({ data }: { data: ExoItem }): React.JSX.Element {
    return (
        <TouchableOpacity onPress={() => router.push(`/exos/${data?.id}`)}>
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
        </TouchableOpacity>
    );
}

/**
 * Component giving a small map based on information about a program
 * @author wiizz
 * @param {ProgItem} data {@link ProgItem ProgItem}
 * @returns {React.JSX.Element}
 */
export function ProgsCard({ data }: { data: ProgItem }): React.JSX.Element {
    return (
        <TouchableOpacity onPress={() => router.push(`/progs/${data?.id}`)}>
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
        </TouchableOpacity>
    );
}
