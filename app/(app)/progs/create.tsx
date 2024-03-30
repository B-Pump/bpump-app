import { BottomSheetModal } from "@gorhom/bottom-sheet";
import axios from "axios";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Sheet } from "@/components/progs-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/auth";
import useFetch, { API_URL } from "@/lib/api";

export default function CreateProgs() {
    const { authState } = useAuth();

    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [difficulty, setDiff] = useState("");

    const categoryRef = useRef<BottomSheetModal>(null);
    const exoRef = useRef<BottomSheetModal>(null);

    const { data, isLoading, error } = useFetch("GET", "exos/all");

    let category = [];
    if (Array.isArray(data) && !isLoading && !error) {
        const uniqueCategories = new Set(data.map((item) => item.category));
        category = [...uniqueCategories];
    }

    let exos = [];
    if (Array.isArray(data) && !isLoading && !error) {
        const uniqueExos = new Set(data.map((item) => item.title));
        exos = [...uniqueExos];
    }

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
            console.error("Error while creating program :", error);
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
                            onPress={() => categoryRef.current?.present()}
                        >
                            <Text className="text-muted-foreground">Catégorie</Text>
                        </Button>
                        <Button
                            variant="outline"
                            className="justify-start p-3.5"
                            onPress={() => exoRef.current?.present()}
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
            <Sheet ref={categoryRef} title="Veuillez sélectionner une catégorie" data={category}>
                <View className="items-center">
                    {category.map((item, index) => (
                        <View className="m-1" key={index}>
                            <TouchableOpacity onPress={() => {}}>
                                <Badge variant="outline" label={item} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </Sheet>
            <Sheet ref={exoRef} title="Veuillez sélectionner des exercices" data={exos}>
                <View className="items-center">
                    {exos.map((item, index) => (
                        <View className="m-1" key={index}>
                            <TouchableOpacity onPress={() => {}}>
                                <Badge variant="outline" label={item} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </Sheet>
        </SafeAreaView>
    );
}
