import { SafeAreaView, ScrollView, View, Text, Button, Switch } from "react-native";

import { useAuth } from "../../../context/auth";
import { COLORS, SIZES } from "../../../constants";

export default function Settings() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, padding: SIZES.medium }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text>Settings</Text>
                <Switch
                    trackColor={{
                        true: COLORS.primary,
                        false: COLORS.gray2,
                    }}
                    onChange={() => {
                        console.log("switch on");
                    }}
                    value={true}
                    thumbColor={COLORS.white}
                />
                <Button title="Sign out" color={"red"} onPress={useAuth().signOut} />
            </ScrollView>
        </SafeAreaView>
    );
}
