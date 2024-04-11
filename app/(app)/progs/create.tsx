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
import { useDataStore } from "@/context/data";
import { API_URL } from "@/lib/api";
import { useColorScheme } from "@/lib/color";

interface ExosList {
    id: string;
    title: string;
}

export default function CreateProgs() {
    const { exos } = useDataStore();
    const { token } = useAuth();
    const { isDarkColorScheme } = useColorScheme();

    const [loading, setLoading] = useState<boolean>(false);

    const [icon, setIcon] = useState<string>(null);
    const [title, setTitle] = useState<string>(null);
    const [description, setDesc] = useState<string>(null);
    const [difficulty, setDiff] = useState<string>(null);
    const [category, setCategory] = useState<string>(null);
    const [exercises, setExercices] = useState<ExosList[]>([]);

    const categoryRef = useRef<BottomSheetModal>(null);
    const exoRef = useRef<BottomSheetModal>(null);

    let categoryData = [];
    if (Array.isArray(exos)) {
        const uniqueCategories = new Set(exos.map((item) => item.category));
        categoryData = [...uniqueCategories];
    }

    const addProg = async () => {
        try {
            if (icon && title && description && difficulty && categoryData && exercises) {
                const newDiff = parseInt(difficulty);
                if (newDiff >= 1 && newDiff <= 5) {
                    setLoading(true);

                    await axios.post(`${API_URL}/add_program?username=${token}`, {
                        id: title.toLowerCase(),
                        owner: token,
                        icon: icon,
                        title: title,
                        description: description,
                        category: category,
                        difficulty: newDiff,
                        hint: [
                            "Hydratez-vous régulièrement",
                            "Portez des vêtements adaptés à votre activité physique",
                            "N'oubliez pas de respirer correctement pendant les exercices",
                            "Écoutez votre corps et reposez-vous en cas de douleur ou de fatigue excessive",
                            "Faites des étirements après chaque séance pour améliorer votre souplesse et prévenir les courbatures",
                            "Soyez patient et persévérant, les résultats viendront avec le temps et l'effort",
                            "Entraînez-vous dans un environnement sûr et adapté à votre activité",
                        ],
                        exercises: exercises.map((exercise) => exercise.id),
                    });

                    router.back();
                    setLoading(false);
                } else Alert.alert("Erreur", "La difficulté doit être un nombre entre 1 et 5");
            } else Alert.alert("Erreur", "Veuillez remplir tous les champs");
        } catch (error) {
            console.warn("Error while creating program :", error);
        }
    };

    // const moveExerciseUp = (index) => {
    //     if (index === 0) return;
    //     const newOrder = [...exercises];
    //     const temp = newOrder[index];
    //     newOrder[index] = newOrder[index - 1];
    //     newOrder[index - 1] = temp;
    //     setExercices(newOrder);
    // };

    // const moveExerciseDown = (index) => {
    //     if (index === exercises.length - 1) return;
    //     const newOrder = [...exercises];
    //     const temp = newOrder[index];
    //     newOrder[index] = newOrder[index + 1];
    //     newOrder[index + 1] = temp;
    //     setExercices(newOrder);
    // };

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
                        <Input
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            maxLength={10}
                            placeholder="Titre"
                        />
                        <Input value={description} onChangeText={(text) => setDesc(text)} placeholder="Description" />
                        <Input
                            value={icon}
                            onChangeText={(text) => setIcon(text)}
                            keyboardType="url"
                            placeholder="Icône (lien)"
                        />
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
                            <Text className={category ? "text-foreground" : "text-muted-foreground"}>
                                {category || "Catégorie"}
                            </Text>
                        </Button>
                        <Button
                            variant="outline"
                            className="justify-start p-3.5"
                            onPress={() => exoRef.current?.present()}
                        >
                            <Text className={exercises.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                                {exercises.length > 0
                                    ? exercises.map((exercise: ExosList) => exercise.title).join(", ")
                                    : "Exercices"}
                            </Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
            <View className="py-3">
                <Button onPress={addProg} disabled={loading}>
                    <Text className="text-accent">Créer ce programme</Text>
                </Button>
            </View>
            <Sheet ref={categoryRef} snap={["25%", "35%"]}>
                <View className="mb-4 items-center">
                    <Text className="text-xl font-bold text-foreground">Veuillez sélectionner une catégorie</Text>
                </View>
                <View className="flex flex-row flex-wrap justify-center">
                    {categoryData.map((item: string, index: number) => (
                        <View className="m-1" key={index}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (category === item) {
                                        setCategory(null);
                                    } else setCategory(item);
                                }}
                            >
                                <Badge variant={category === item ? "success" : "outline"} label={item} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </Sheet>
            <Sheet ref={exoRef} snap={["35%", "60%"]}>
                <View className="mb-4 items-center">
                    <Text className="text-xl font-bold text-foreground">Veuillez sélectionner des exercices</Text>
                </View>
                <View className="flex flex-row flex-wrap justify-center">
                    {exos.map((item: ExoItem, index: number) => (
                        <View className="m-1" key={index}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (exercises.some((exercise: ExosList) => exercise.id === item.id)) {
                                        setExercices(exercises.filter((exercise: ExosList) => exercise.id !== item.id));
                                    } else setExercices([...exercises, { id: item.id, title: item.title }]);
                                }}
                            >
                                <Badge
                                    variant={
                                        exercises.some((exercise: ExosList) => exercise.id === item.id)
                                            ? "success"
                                            : "outline"
                                    }
                                    label={item.title}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                {/* TODO: Drag & drop to change exos order */}
                {/* <View className="mt-5 flex-row justify-center">
                    {exercises.map((item: { id: string; title: string }, index: number) => (
                        <View className="flex-col items-center gap-6" key={index}>
                            <TouchableOpacity onPress={() => moveExerciseUp(index)}>
                                <Text>HAUT</Text>
                            </TouchableOpacity>
                            <Text>{item.title}</Text>
                            <TouchableOpacity onPress={() => moveExerciseDown(index)}>
                                <Text>BAS</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View> */}
            </Sheet>
        </SafeAreaView>
    );
}
