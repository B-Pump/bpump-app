import { Image } from "expo-image";
import { router } from "expo-router";
import { setItemAsync } from "expo-secure-store";
import { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import { DEFAULT_THEME, THEME_KEY } from "@/lib/color";

export default function Register() {
    const { register, login } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);

    const [username, setUsername] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);
    const [weight, setWeight] = useState<string>(null);
    const [height, setHeight] = useState<string>(null);
    const [age, setAge] = useState<string>(null);
    const [sex, setSex] = useState<string>(null);

    const onRegister = async () => {
        if (!username || !password || !weight || !height || !age || !sex) {
            return Alert.alert("Erreur", "Veuillez remplir tous les champs");
        }

        const usernameRegex = /^[a-zA-Z0-9_\-]+$/;
        const passwordRegex = /^[a-zA-Z0-9@#$%^&*]+$/;
        const ageRegex = /^(1[6-9]|[2-9]\d)$/;

        if (!usernameRegex.test(username.trim()) && !passwordRegex.test(password.trim())) {
            return Alert.alert(
                "Erreur",
                "Le nom d'utilisateur ou le mot de passe contient des caractères non autorisés",
            );
        }
        if (!ageRegex.test(age.trim())) {
            return Alert.alert("Erreur", "Vous devez saisir un âge entre 16 et 99 ans");
        }

        setLoading(true);

        const registerResult = await register!(
            username,
            password,
            parseInt(weight),
            parseInt(height),
            parseInt(age),
            sex,
        );
        if (registerResult && registerResult.error) {
            setLoading(false);
            return Alert.alert("Erreur", "Erreur lors de la création du compte");
        }

        const loginResult = await login!(username, password);
        if (loginResult && loginResult.error) {
            Alert.alert("Erreur", "Erreur lors de la connexion à votre compte");
        } else {
            setItemAsync(THEME_KEY, DEFAULT_THEME);
            router.replace("/");
        }

        setLoading(false);
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-3">
            <View>
                <View className="mb-5 items-center">
                    <Text className="text-3xl font-bold">Oh ! Un nouveau sportif ?</Text>
                </View>
                <View className="py-5">
                    <View className="mb-5 gap-3">
                        <Input
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            placeholder="Identifiant"
                            autoComplete="username"
                        />
                        <Input
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Mot de passe"
                            secureTextEntry
                            autoComplete="password"
                        />
                        <Input
                            value={weight}
                            onChangeText={(text) => setWeight(text)}
                            placeholder="Poids (kg)"
                            keyboardType="numeric"
                            maxLength={3}
                        />
                        <Input
                            value={height}
                            onChangeText={(text) => setHeight(text)}
                            placeholder="Taille (cm)"
                            keyboardType="numeric"
                            maxLength={3}
                        />
                        <Input
                            value={age}
                            onChangeText={(text) => setAge(text)}
                            placeholder="Âge (années)"
                            keyboardType="numeric"
                            maxLength={2}
                        />
                        <Input
                            value={sex}
                            onChangeText={(text) => setSex(text.toLocaleLowerCase())}
                            placeholder="Sexe de naissance (m ou f)"
                            maxLength={1}
                        />
                    </View>
                </View>
            </View>
            <View className="flex-1 items-center">
                <Image source="https://i.ibb.co/GVMtQbx/1.png" style={{ width: "50%", height: 300 }} />
            </View>
            <View className="py-3">
                <Button onPress={onRegister} disabled={loading}>
                    <Text className="text-accent">Créer un compte</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
