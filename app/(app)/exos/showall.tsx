import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { ExosCard } from "@/components/data-card";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { useDataStore } from "@/context/data";

/**
 * Page which displays all the exercises and offers sorting by category
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function ShowallExos(): React.JSX.Element {
    const { exos: data } = useDataStore();

    const tabs: string[] = ["Tout", ...(data ? [...new Set(data.map((item: ExoItem) => item?.category))] : [])];

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
                    <>
                        <TabsTrigger data={tabs} />
                        {tabs.map((tab: string, index: number) => (
                            <TabsContent value={tab} key={index}>
                                {tab === "Tout" ? (
                                    <>
                                        {data?.map((item: ExoItem, index: number) => (
                                            <View className="py-1" key={index}>
                                                <ExosCard data={item} />
                                            </View>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {data?.map((item: ExoItem, index: number) => {
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
                    </>
                </Tabs>
            </ScrollView>
        </SafeAreaView>
    );
}
