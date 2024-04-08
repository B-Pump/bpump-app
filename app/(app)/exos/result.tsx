import { globals } from "@/styles/globals";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { useColorScheme } from "@/lib/color";
import { ScrollView } from "react-native";

interface ChartDataItem {
    value: number;
    time: number;
}

export default function Result() {
    const { data } = useLocalSearchParams();
    const { isDarkColorScheme } = useColorScheme();

    const [chartData, setChartData] = useState<ChartDataItem[]>([]);

    useEffect(() => {
        if (typeof data === "string") {
            try {
                const parsedData = JSON.parse(data);

                if (Array.isArray(parsedData)) {
                    setChartData(parsedData);
                } else console.warn("Data is not in tabular form");
            } catch (error) {
                console.warn("Error parsing JSON data :", error);
            }
        } else console.warn("Data is not a string");
    }, [data]);

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-2xl text-foreground">Bel effort !</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Découvrez vos statistiques !
                    </Text>
                </View>
                <View className="my-3">
                    <LineChart
                        data={chartData}
                        width={300}
                        height={400}
                        thickness={2}
                        initialSpacing={0}
                        rulesColor={isDarkColorScheme ? "gray" : "gray"}
                        dataPointsColor={isDarkColorScheme ? globals.dark.primary : globals.light.primary}
                        color={isDarkColorScheme ? globals.light.primary : globals.dark.primary}
                        yAxisColor={isDarkColorScheme ? "white" : "black"}
                        xAxisColor={isDarkColorScheme ? "white" : "black"}
                    />
                </View>
                <View>
                    <Text className="text-lg font-medium text-foreground">Résumé de votre performance :</Text>
                    <Text className="text-foreground">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et placeat, non corporis, doloremque
                        pariatur harum quaerat ipsum, vitae maxime vero animi temporibus perspiciatis sunt corrupti
                        laudantium dolor totam! Corrupti excepturi, tempore consectetur deleniti doloribus, possimus
                        eaque libero laudantium, voluptates fugit quaerat in molestiae totam nesciunt neque adipisci.
                        Accusamus saepe dolorem omnis dicta eligendi tenetur inventore. Minus, dicta? Id, soluta.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
