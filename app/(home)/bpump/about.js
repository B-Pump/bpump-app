import { SafeAreaView, ScrollView, View, Text } from "react-native";

import { COLORS, SIZES } from "../../../constants";

export default function About() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, padding: SIZES.medium }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text>About</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
