import { Text, View, SafeAreaView, ScrollView, TextInput } from "react-native";
import { Stack } from "expo-router";

import { useTheme } from "../../utils/themeProvider";

import { SIZES, icons } from "../../constants";
import styles from "../../styles/auth";

const AuthLogin = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: useTheme().colors.background,
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: useTheme().colors.background,
                    },
                    headerShadowVisible: false,
                    headerTitle: "",
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, marginLeft: SIZES.medium }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                marginVertical: 12,
                            }}
                        >
                            Créer un compte
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            Démarrez dès maintenant votre séance sportive connectée !
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                marginVertical: 8,
                            }}
                        >
                            Identifiant
                        </Text>
                        <View style={styles.usernameInputView}>
                            <TextInput placeholder="Entrez votre identifiant" style={styles.usernameInput} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AuthLogin;
