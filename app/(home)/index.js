import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { router } from "expo-router";

import { Home, Progs, Exos } from "../../components";
import { COLORS, SIZES } from "../../constants";

export default function Index() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, paddingHorizontal: SIZES.medium }}>
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
