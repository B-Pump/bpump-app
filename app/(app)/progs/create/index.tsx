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
import { useCreateStore } from "@/context/create";
import { useDataStore } from "@/context/data";
import { API_URL } from "@/lib/api";

/**
 * Page on which the user can create their own sports program from the exercises already available
 * @author wiizz
 * @returns {React.JSX.Element}
 */
export default function CreateProgs(): React.JSX.Element {
    const { exos } = useDataStore();
    const { selected } = useCreateStore();

    const { token } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);

    const [icon, setIcon] = useState<string>(null);
    const [title, setTitle] = useState<string>(null);
    const [description, setDesc] = useState<string>(null);
    const [difficulty, setDiff] = useState<string>(null);
    const [category, setCategory] = useState<string>(null);

    const categoryRef = useRef<BottomSheetModal>(null);

    let categoryData = [];
    if (Array.isArray(exos)) {
        // Create a table with the existing (unique) categories of exercises
        const uniqueCategories = new Set(exos.map((item) => item.category));
        categoryData = [...uniqueCategories];
    }

    const exoFilter = selected
        .filter((item): item is { type: "exercise"; exo: ExosList; reps: number } => item.type === "exercise")
        .map((exercise) => exercise.exo.title);
    const restFilter = selected
        .filter((item): item is { type: "rest"; duration: number } => item.type === "rest")
        .map((exercise) => exercise.duration);

    const addProg = async () => {
        try {
            if (icon && title && description && difficulty && categoryData && exoFilter.length > 0) {
                const newDiff = parseInt(difficulty);
                if (newDiff >= 1 && newDiff <= 5) {
                    setLoading(true);

                    const numberOfExercises = selected.filter((item) => item.type === "exercise").length;
                    if (restFilter.length < numberOfExercises) {
                        const missingRestTimes = new Array(numberOfExercises - restFilter.length).fill(0);
                        restFilter.push(...missingRestTimes);
                    }

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
                        exercises: selected
                            .filter(
                                (item): item is { type: "exercise"; exo: ExosList; reps: number } =>
                                    item.type === "exercise",
                            )
                            .map((exercise) => exercise.exo.id),
                        reps: selected
                            .filter(
                                (item): item is { type: "exercise"; exo: ExosList; reps: number } =>
                                    item.type === "exercise",
                            )
                            .map((exercise) => exercise.reps),
                        rest: restFilter,
                    });

                    router.back();
                } else Alert.alert("Erreur", "La difficulté doit être un nombre entre 1 et 5");
            } else Alert.alert("Erreur", "Veuillez remplir tous les champs");
        } catch (error) {
            console.warn("Error while creating program :", error);
        }

        setLoading(false);
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
                            onPress={() => router.push("/progs/create/select")}
                        >
                            <Text className={exoFilter.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                                {exoFilter.length > 0 ? exoFilter.join(", ") : "Exercices"}
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
                <>
                    <View className="mb-4 items-center">
                        <Text className="text-xl font-bold text-foreground">Veuillez sélectionner une catégorie</Text>
                    </View>
                    <View className="flex flex-row flex-wrap justify-center">
                        {categoryData.map((item: string, index: number) => (
                            <View className="m-1" key={index}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (category === item) {
                                            setCategory(null); // Unselect category because it was already selected
                                        } else setCategory(item);
                                    }}
                                >
                                    <Badge variant={category === item ? "success" : "outline"} label={item} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </>
            </Sheet>
        </SafeAreaView>
    );
}
