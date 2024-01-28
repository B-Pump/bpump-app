import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView } from "react-native";

import { Exo } from "../../../components";
import { COLORS, SIZES } from "../../../constants";

export default function ExosDetails() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, paddingHorizontal: SIZES.medium }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Exo exo={useLocalSearchParams().id} />
            </ScrollView>
        </SafeAreaView>
    );
}
