import { SafeAreaView, View, Text } from "react-native";

import { COLORS, SIZES } from "../../constants";
import styles from "../../style/auth";

export default function Register() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, padding: SIZES.medium }}>
            <Text>Register screen - En attente du design</Text>
        </SafeAreaView>
    );
}
