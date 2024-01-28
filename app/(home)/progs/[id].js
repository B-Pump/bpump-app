import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ProgsDetails() {
    const prog = useLocalSearchParams();

    return (
        <View>
            <Text>qfdqsfvqd - {prog.id}</Text>
        </View>
    );
}
