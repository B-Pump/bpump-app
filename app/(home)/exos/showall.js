import { Stack, router } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

import { ScreenHeaderBtn, Showall } from "../../../components";
import useFetch from "../../../context/api";
import { useTheme } from "../../../context/theme";

import { SIZES, icons } from "../../../constants";

export default function ShowallExo() {
    const { data, isLoading, error } = useFetch("GET", "exos/all");

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Showall data={data} load={isLoading} error={error} />
            </ScrollView>
        </SafeAreaView>
    );
}
