import { Stack, router } from "expo-router";
import { Share } from "react-native";

import { ScreenHeaderBtn } from "../../components";
import { images, COLORS, icons } from "../../constants";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.light.background,
                    },
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={images.logo}
                            dimension="100%"
                            handlePress={() => router.push("/bpump/about")}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.settings}
                            dimension="70%"
                            handlePress={() => router.push("/bpump/settings")}
                        />
                    ),
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="bpump/settings"
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.light.background,
                    },
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.back} dimension="65%" handlePress={() => router.back()} />
                    ),
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="bpump/about"
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.light.background,
                    },
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.back} dimension="65%" handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                            handlePress={() => {
                                Share.share({
                                    message:
                                        "Je me suis mit au sport grâce à B-Pump, le coach sportif 100% robotique ! Tu devrais essayer : <lien_vers_le_site_web>",
                                });
                            }}
                        />
                    ),
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
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
            <Stack.Screen
                name="search/[id]"
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.light.background,
                    },
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.back} dimension="65%" handlePress={() => router.back()} />
                    ),
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
        </Stack>
    );
}
