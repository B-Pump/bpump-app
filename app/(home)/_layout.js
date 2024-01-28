import { Stack, router } from "expo-router";

import { ScreenHeaderBtn } from "../../components";
import { ThemeProvider } from "../../context/theme";

import { icons } from "../../constants";

export default function HomeLayout() {
    return (
        <ThemeProvider>
            <Stack>
                <Stack.Screen
                    name="bpump/scan"
                    options={{
                        headerTransparent: true,
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.back} dimension="65%" handlePress={() => router.back()} />
                        ),
                        headerShadowVisible: false,
                        headerTitle: "",
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
