import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";

import { useDataStore } from "@/context/data";

/**
 * Page that displays the content of the user's search made via the home page input
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function Search(): React.JSX.Element {
    const { exos } = useDataStore();
    const { id } = useLocalSearchParams();

    const normalizeString = (str: string): string => {
        return str
            .normalize("NFD") // break down letter accents (unicode normalization form decomposition)
            .replace(/[\u0300-\u036f]/g, "") // remove diacritics (accents) from the string using a regular expression
            .toLowerCase();
    };

    const filteredData = exos?.filter((item: ExoItem): boolean => {
        const title = item?.title || "";
        const description = item?.description || "";
        const category = item?.category || "";

        // Find the keyword in the exercise data
        const matchKeyword = (field: string): boolean => {
            const keywordsArray = Array.isArray(id) ? id : [id];
            return keywordsArray.some((kw) => normalizeString(field).includes(normalizeString(kw)));
        };

        // Return true if the keyword was find in the title, description or category
        return matchKeyword(title) || matchKeyword(description) || matchKeyword(category);
    });

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-2xl text-foreground">{id}</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Voici ce que nous avons trouvé pour vous :
                    </Text>
                </View>
                <View className="my-3">
                    {filteredData && filteredData.length > 0 ? (
                        filteredData?.map((item: ExoItem, index: number) => (
                            <View className="py-1" key={index}>
                                <ExosCard data={item} />
                            </View>
                        ))
                    ) : (
                        <Text className="text-foreground">
                            Aucun résultat trouvé pour "{id}", veuillez réessayer...
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
