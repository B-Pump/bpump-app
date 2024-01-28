import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

import { Exo, ScreenHeaderBtn } from "../../../components";
import { SIZES, icons } from "../../../constants";
import { useTheme } from "../../../context/theme";

export default function ExosDetails() {
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
                <Exo exo={useLocalSearchParams().id} />
            </ScrollView>
        </SafeAreaView>
    );
}
