import { Stack, router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeaderBtn } from "../../../components";
import { useTheme } from "../../../context/theme";

import { SIZES, icons } from "../../../constants";

export default function ProgsDetails() {
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
            <ScrollView>
                <Text>Prog - {useLocalSearchParams().id}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
