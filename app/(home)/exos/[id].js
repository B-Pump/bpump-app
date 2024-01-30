import { Stack, router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Exo, ScreenHeaderBtn } from "../../../components";
import useFetch from "../../../context/api";
import { useTheme } from "../../../context/theme";

import { SIZES, icons } from "../../../constants";
import styles from "../../../style/exos.style";

export default function ExosDetails() {
    const { data, isLoading, error, refetch } = useFetch("GET", "exos", useLocalSearchParams().id, {});

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    });

    const startExo = () => {
        // TODO: checking if the robot is properly connected via bluetooth and if yes, launch the python backend
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: useTheme().colors.background, paddingHorizontal: SIZES.medium }}
        >
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: useTheme().colors.background,
                    },
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.back} dimension="65%" handlePress={() => router.back()} />
                    ),
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Exo exo={useLocalSearchParams().id} data={data} load={isLoading} error={error} />
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.startExoBtn} onPress={startExo}>
                    <Text style={styles.startExoText}>Démarrer l'exercice</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
