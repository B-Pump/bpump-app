import { useCallback, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";
import { ExosSkeletonList } from "@/components/data-skeleton";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import useFetch from "@/lib/api";

export default function ShowallExos() {
    const { data, isLoading, error, refetch }: ExosData = useFetch("GET", "exos/all");

    const tabs: string[] = ["Tout", ...(data ? [...new Set(data.map((item: Exos) => item?.category))] : [])];

    const [refreshing, setRefreshing] = useState<boolean>(false);
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
                    <Text className="text-2xl text-foreground">Tous les exercices</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Préparez vous à faire du sport !
                    </Text>
                </View>
                {isLoading ? (
                    <ExosSkeletonList count={6} />
                ) : error ? (
                    <Text className="text-foreground">{error}</Text>
                ) : (
                    <Tabs defaultValue={tabs[0] as string}>
                        <TabsTrigger data={tabs} />
                        {tabs.map((tab: string, index: number) => (
                            <TabsContent value={tab} key={index}>
                                {tab === "Tout" ? (
                                    <>
                                        {data?.map((item: Exos, index: number) => (
                                            <View className="py-1" key={index}>
                                                <ExosCard data={item} isLoading={isLoading} error={error} />
                                            </View>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {data?.map((item: Exos, index: number) => {
                                            if (item?.category === tab) {
                                                return (
                                                    <View className="py-1" key={index}>
                                                        <ExosCard data={item} isLoading={isLoading} error={error} />
                                                    </View>
                                                );
                                            }
                                        })}
                                    </>
                                )}
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
