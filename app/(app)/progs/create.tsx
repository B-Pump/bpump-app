import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import { API_URL } from "@/lib/api";

export default function CreateProgs() {
    const { authState } = useAuth();

    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDiff] = useState("");

    const addProg = async () => {
        try {
            if (title && description && category && difficulty) {
                const newDiff = parseInt(difficulty);
                if (newDiff >= 1 && newDiff <= 5) {
                    setLoading(true);
                    await axios.post(`${API_URL}/add_program?username=${authState.token}`, {
                        id: title.toLowerCase(),
                        title: title,
                        description: description,
                        category: category,
                        difficulty: newDiff,
                        hint: [""],
                        exercises: [""],
                    });
                    router.back();
                    setLoading(false);
                } else Alert.alert("Erreur", "La difficulté doit être un nombre entre 1 et 5");
            } else Alert.alert("Erreur", "Veuillez remplir tous les champs");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-2xl text-foreground">Création de programme</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Élaborez votre propre programme dès maintenant !
                    </Text>
                </View>
                <View className="my-3">
                    <View className="mb-5 gap-3">
                        <Input value={title} onChangeText={(text) => setTitle(text)} placeholder="Titre" />
                        <Input value={description} onChangeText={(text) => setDesc(text)} placeholder="Description" />
                        <Button
                            variant="outline"
                            className="justify-start p-3.5"
                            onPress={() => router.push("/progs/create/category")}
                        >
                            <Text className="text-muted-foreground">Catégorie</Text>
                        </Button>
                        <Input
                            value={difficulty}
                            onChangeText={(text) => setDiff(text)}
                            keyboardType="numeric"
                            maxLength={1}
                            placeholder="Difficulté"
                        />
                        <Button
                            variant="outline"
                            className="justify-start p-3.5"
                            onPress={() => router.push("/progs/create/exos")}
                        >
                            <Text className="text-muted-foreground">Exercices</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
            <View className="py-3">
                <Button onPress={addProg} disabled={loading}>
                    <Text className="text-accent">Créer ce programme</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}
