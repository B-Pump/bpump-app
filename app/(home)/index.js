import { router, Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import { Exos, Home, Progs, ScreenHeaderBtn } from "../../components";
import { icons, images, SIZES } from "../../constants";
import { useTheme } from "../../context/theme";

export default function Index() {
    const [searchTerm, setSearchTerm] = useState("");

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Home
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={() => {
                        if (searchTerm) router.push(`/search/${searchTerm}`);
                    }}
                />
                <Progs />
                <Exos />
            </ScrollView>
        </SafeAreaView>
    );
}
