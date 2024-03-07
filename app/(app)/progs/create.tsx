import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function CreateProgs() {
    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-foreground text-2xl">Création de programme</Text>
                    <Text className="text-foreground text-3xl font-semibold leading-tight">
                        Élaborez votre propre programme dès maintenant !
                    </Text>
                </View>
                <View className="my-3">
                    <Text className="text-foreground">Formulaire de création de programmes</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
