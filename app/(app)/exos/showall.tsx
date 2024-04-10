import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { useDataStore } from "@/context/data";

export default function ShowallExos() {
    const { exos: data } = useDataStore();

    const tabs: string[] = ["Tout", ...(data ? [...new Set(data.map((item: Exos) => item?.category))] : [])];

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-2xl text-foreground">Tous les exercices</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Préparez vous à faire du sport !
                    </Text>
                </View>
                <Tabs defaultValue={tabs[0] as string}>
                    <TabsTrigger data={tabs} />
                    {tabs.map((tab: string, index: number) => (
                        <TabsContent value={tab} key={index}>
                            {tab === "Tout" ? (
                                <>
                                    {data?.map((item: Exos, index: number) => (
                                        <View className="py-1" key={index}>
                                            <ExosCard data={item} />
                                        </View>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {data?.map((item: Exos, index: number) => {
                                        if (item?.category === tab) {
                                            return (
                                                <View className="py-1" key={index}>
                                                    <ExosCard data={item} />
                                                </View>
                                            );
                                        }
                                    })}
                                </>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </ScrollView>
        </SafeAreaView>
    );
}
