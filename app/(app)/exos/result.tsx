import { useLocalSearchParams } from "expo-router";
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

    const chartData = JSON.parse(data as string) as ChartDataItem;

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3 px-3">
                    <Text className="text-2xl text-foreground">Bel effort !</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Découvrez vos statistiques !
                    </Text>
                </View>
                <View className="my-3">
                    <LineChart
                        curved
                        noOfSections={7}
                        spacing={16}
                        data={chartData.force}
                        secondaryData={chartData.speed}
                        hideDataPoints
                        width={300}
                        height={350}
                        initialSpacing={3}
                        rulesColor="gray"
                        color1="red"
                        secondaryLineConfig={{ color: "blue" }}
                        secondaryYAxis={{ yAxisColor: "blue" }}
                        xAxisColor={isDarkColorScheme ? "white" : "black"}
                        yAxisColor="red"
                    />
                </View>
                <View className="pb-5">
                    <Text className="text-center font-medium text-red-600">
                        Force exercée (Newton) en fonction du temps (secondes).
                    </Text>
                    <Text className="text-center font-medium text-blue-800">
                        Vitesse (mètre/seconde) en fonction du temps (secondes).
                    </Text>
                </View>
                <View className="px-3">
                    <Text className="text-lg font-medium text-foreground">📋​ Résumé de votre performance :</Text>
                    <Text className="pb-2 text-foreground">
                        Vous avez dépensé {Math.round(chartData.total_energy)} joules, ce qui équivaut à{" "}
                        {Math.round(chartData.total_energy * 0.24)} calories.
                    </Text>
                    <Text className="text-xs text-foreground">
                        Veuillez noter que les données affichées sont des estimations théoriques et peuvent ne pas
                        correspondre exactement à votre performance réelle. Plusieurs facteurs peuvent influencer les
                        résultats, tels que la précision des capteurs, les conditions environnementales et les
                        variations individuelles dans la technique d'exercice. Les chiffres fournis sont donc à titre
                        indicatif et peuvent nécessiter une certaine marge d'erreur. Continuez votre bon travail et
                        utilisez ces statistiques comme un guide général pour évaluer votre performance.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
