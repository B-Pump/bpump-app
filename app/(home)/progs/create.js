import { Stack, router } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

import { Create, ScreenHeaderBtn } from "../../../components";
import { useTheme } from "../../../context/theme";

import { SIZES, icons } from "../../../constants";

export default function CreateProg() {
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
                <Create />
            </ScrollView>
        </SafeAreaView>
    );
}
