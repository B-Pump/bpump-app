import { useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";
import { ExosSkeleton } from "@/components/data-skeleton";

import { Button } from "@/components/ui/button";
import useFetch from "@/lib/api";

export default function ShowallExos() {
    const { data, isLoading, error } = useFetch("GET", "exos/all");

    const tabs = ["Tout", ...(data ? [...new Set(data.map((item: Exos) => item?.sugar?.category))] : [])];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const displayTabContent = () => {
        switch (activeTab) {
            case tabs[0]:
                return data?.map((item: Exos, index: number) => (
                    <View className="py-1" key={index}>
                        <ExosCard data={item} load={isLoading} error={error} />
                    </View>
                ));

            default:
                return data?.map((item: Exos, index: number) => {
                    if (item?.sugar?.category === activeTab)
                        return (
                            <View className="py-1" key={index}>
                                <ExosCard data={item} load={isLoading} error={error} />
                            </View>
                        );

                    return null;
                });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-foreground text-2xl">Apprenez en plus sur notre projet !</Text>
                    <Text className="text-foreground text-3xl font-semibold leading-tight">Qu'est-ce que B-Pump ?</Text>
                </View>
                {isLoading ? (
                    <ExosSkeleton />
                ) : error ? (
                    <Text>{error}</Text>
                ) : (
                    <>
                        <View className="my-3 justify-center items-center">
                            <FlatList
                                data={tabs as string[]}
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
                        <View className="my-3">{displayTabContent()}</View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
