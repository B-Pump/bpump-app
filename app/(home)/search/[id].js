import { Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { ScreenHeaderBtn, Search } from "../../../components";
import useFetch from "../../../context/api";
import { useTheme } from "../../../context/theme";

import { SIZES, icons } from "../../../constants";
import styles from "../../../style/search.style";

export default function SearchContent() {
    const { id } = useLocalSearchParams();
    const { data, isLoading, error } = useFetch("GET", "fetch", "exos");

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
                <View style={styles.container}>
                    <Text style={styles.title}>{id}</Text>
                    <Text style={styles.desc}>Voici ce que nous avons trouvé pour vous :</Text>
                </View>
                <Search data={data} load={isLoading} error={error} keyword={id} />
            </ScrollView>
        </SafeAreaView>
    );
}
