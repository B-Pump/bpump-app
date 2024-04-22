import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Sheet } from "@/components/progs-sheet";
import { Button } from "@/components/ui/button";

import { useCreateStore } from "@/context/create";
import { useDataStore } from "@/context/data";
import { Image } from "expo-image";

export default function SelectExos() {
    const { exos } = useDataStore();
    const { selected, setSelected } = useCreateStore();

    const exoRef = useRef<BottomSheetModal>(null);

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
                    <Text className="text-3xl font-semibold leading-tight text-foreground">Choix des exercices</Text>
                </View>
                <View className="my-3">
                    <Text className={selected.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                        {selected.length > 0 ? (
                            selected.map((item: ExosList, index: number) => <View key={index}></View>)
                        ) : (
                            <></>
                        )}
                    </Text>
                </View>
            </ScrollView>
            <View className="py-3">
                <Button onPress={() => exoRef.current?.present()}>
                    <Text className="text-accent">Ajouter un exercice</Text>
                </Button>
            </View>
            <Sheet ref={exoRef} snap={["35%", "60%"]}>
                <>
                    <View className="mb-4 items-center">
                        <Text className="text-xl font-bold text-foreground">Veuillez sélectionner des exercices</Text>
                    </View>
                    <View className="flex flex-row flex-wrap justify-center">
                        {exos.map((item: ExoItem, index: number) => (
                            <View className="m-1" key={index}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // Checks if an exercise with the same ID as the current item already exists in the list
                                        if (selected.some((exercise: ExosList) => exercise.id === item.id)) {
                                            setSelected(
                                                // If an exercise with the same ID already exists, remove it from the list
                                                selected.filter((exercise: ExosList) => exercise.id !== item.id),
                                            );
                                            // If no exercise with the same ID exists, add the new exercise to the list
                                        } else setSelected([...selected, { id: item.id, title: item.title }]);
                                    }}
                                >
                                    <View
                                        className={`rounded-lg border border-border bg-background p-6 ${
                                            selected.some((exercise: ExosList) => exercise.id === item.id) &&
                                            "border-primary"
                                        }`}
                                    >
                                        <View className="w-20 items-center justify-between rounded-xl">
                                            <Image
                                                style={{ width: 65, height: 65, borderRadius: 10 }}
                                                source={item?.icon || "https://urlz.fr/q5qm"}
                                                contentFit="fill"
                                            />
                                            <Text className="text-lg font-medium text-foreground" numberOfLines={1}>
                                                {item?.title || "Titre non trouvé"}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </>
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
