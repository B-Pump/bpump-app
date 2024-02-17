import { Stack, router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Prog, ScreenHeaderBtn } from "../../../components";
import useFetch from "../../../context/api";
import { useTheme } from "../../../context/theme";

import { SIZES, icons } from "../../../constants";
import styles from "../../../style/progs.style";

export default function ProgsDetails() {
    const { data, isLoading, error, refetch } = useFetch(
        "GET",
        `progs/${useLocalSearchParams().id}?username=pierre`,
        {},
    );
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    });

    const startProg = () => {
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
                style={{ marginBottom: SIZES.xxLarge + 30 }} // prevent the button from hiding the bottom content of the scrollview
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Prog data={data} load={isLoading} error={error} />
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.startExoBtn} onPress={startProg}>
                    <Text style={styles.startExoText}>Démarrer le programme</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
