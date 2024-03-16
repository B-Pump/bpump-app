import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";
import { ExosSkeletonList } from "@/components/data-skeleton";

import useFetch from "@/lib/api";

export default function Search() {
    const { id } = useLocalSearchParams();
    const { data, isLoading, error, refetch } = useFetch("GET", "exos/all");

    const normalizeString = (str: string): string => {
        return str
            .normalize("NFD") // break down letter accents (unicode normalization form decomposition)
            .replace(/[\u0300-\u036f]/g, "") // remove diacritics (accents) from the string using a regular expression
            .toLowerCase();
    };
    const filteredData = data?.filter((item: Exos) => {
        const title = item?.title || "";
        const description = item?.description || "";
        const category = item?.category || "";

        const matchKeyword = (field: string): boolean => {
            const keywordsArray = Array.isArray(id) ? id : [id];
            return keywordsArray.some((kw) => normalizeString(field).includes(normalizeString(kw)));
        };

        return matchKeyword(title) || matchKeyword(description) || matchKeyword(category);
    });

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [setRefreshing, refetch]);

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="mt-3">
                    <Text className="text-2xl text-foreground">{id}</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Voici ce que nous avons trouvé pour vous :
                    </Text>
                </View>
                <View className="my-3">
                    {isLoading ? (
                        <ExosSkeletonList count={6} />
                    ) : error ? (
                        <Text className="text-foreground">{error}</Text>
                    ) : filteredData && filteredData.length > 0 ? (
                        filteredData?.map((item: Exos, index: number) => (
                            <View className="py-1" key={index}>
                                <ExosCard data={item} load={isLoading} error={error} />
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
