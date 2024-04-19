import { globals } from "@/styles/globals";

import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import { useColorScheme } from "@/lib/color";

/**
 * Page that displays a summary of the exercise performed by the user
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function Result(): React.JSX.Element {
    const { data } = useLocalSearchParams();
    const { isDarkColorScheme } = useColorScheme();

    const [chartData, setChartData] = useState<ChartDataItem>({
        message: "",
        data: [],
    });

    useEffect(() => {
        if (typeof data === "string") {
            try {
                const parsedData = JSON.parse(data);

                if (Array.isArray(parsedData.data)) {
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
                        isAnimated
                        curved
                        data={chartData.data}
                        width={300}
                        height={350}
                        thickness={2}
                        initialSpacing={3}
                        rulesColor={isDarkColorScheme ? "gray" : "gray"}
                        dataPointsColor={isDarkColorScheme ? globals.dark.primary : globals.light.primary}
                        color={isDarkColorScheme ? globals.light.primary : globals.dark.primary}
                        yAxisColor={isDarkColorScheme ? "white" : "black"}
                        xAxisColor={isDarkColorScheme ? "white" : "black"}
                        yAxisLabelSuffix="N"
                    />
                </View>
                <Text className="pb-5 text-center font-semibold">
                    Force exercée (Newton) en fonction du temps (secondes).
                </Text>
                <View>
                    <Text className="text-lg font-medium text-foreground">📋​ Résumé de votre performance :</Text>
                    <Text className="text-foreground">{chartData.message}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
