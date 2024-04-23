import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { Minus, Plus, Trash } from "lucide-react-native";
import { useRef } from "react";
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Sheet } from "@/components/progs-sheet";
import { Button } from "@/components/ui/button";

import { CreateCard } from "@/components/data-card";
import { useCreateStore, useCreateStoreActions } from "@/context/create";
import { useDataStore } from "@/context/data";
import { useColorScheme } from "@/lib/color";

export default function SelectExos() {
    const { exos } = useDataStore();

    const { selected } = useCreateStore();
    const { addExercise, addRest, removeItem, updateExerciseReps, updateRestDuration } = useCreateStoreActions();

    const { isDarkColorScheme } = useColorScheme();

    const exoRef = useRef<BottomSheetModal>(null);

    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-2xl text-foreground">Création de programme</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">
                        Choisissez des exercices
                    </Text>
                </View>
                <View className="my-3">
                    {selected.length > 0 ? (
                        selected.map((item: SelectedItem, index: number) =>
                            item.type === "exercise" ? (
                                <View className="flex-row items-center justify-center py-1" key={index}>
                                    <CreateCard
                                        icon={item.exo?.icon || "https://urlz.fr/q5qm"}
                                        title={item.exo?.title + " - " + item.reps + " reps"}
                                    />
                                    <View className="flex-row gap-2">
                                        <Button
                                            size="icon_lg"
                                            onPress={() => {
                                                if (item.reps > 3) updateExerciseReps(index, item.reps - 1);
                                            }}
                                            disabled={item.reps === 3}
                                        >
                                            <Minus color={isDarkColorScheme ? "black" : "white"} />
                                        </Button>
                                        <Button
                                            size="icon_lg"
                                            onPress={() => {
                                                if (item.reps <= 30) updateExerciseReps(index, item.reps + 1);
                                            }}
                                            disabled={item.reps === 30}
                                        >
                                            <Plus color={isDarkColorScheme ? "black" : "white"} />
                                        </Button>
                                        <Button variant="destructive" size="icon_lg" onPress={() => removeItem(index)}>
                                            <Trash color={isDarkColorScheme ? "black" : "white"} />
                                        </Button>
                                    </View>
                                </View>
                            ) : (
                                <View className="flex-row items-center justify-center py-1" key={index}>
                                    <CreateCard
                                        icon="https://i.imgur.com/ieQPqYc.png"
                                        title={"Repos - " + item.duration + " sec"}
                                    />
                                    <View className="flex-row gap-2">
                                        <Button
                                            size="icon_lg"
                                            onPress={() => {
                                                if (item.duration > 15) updateRestDuration(index, item.duration - 15);
                                            }}
                                            disabled={item.duration === 15}
                                        >
                                            <Minus color={isDarkColorScheme ? "black" : "white"} />
                                        </Button>
                                        <Button
                                            size="icon_lg"
                                            onPress={() => {
                                                if (item.duration <= 180) updateRestDuration(index, item.duration + 15);
                                            }}
                                            disabled={item.duration === 180}
                                        >
                                            <Plus color={isDarkColorScheme ? "black" : "white"} />
                                        </Button>
                                        <Button variant="destructive" size="icon_lg" onPress={() => removeItem(index)}>
                                            <Trash color={isDarkColorScheme ? "black" : "white"} />
                                        </Button>
                                    </View>
                                </View>
                            ),
                        )
                    ) : (
                        <View className="items-center pt-20">
                            <Text className="text-lg font-medium">Rien à afficher ici...</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <View className="flex-row items-center justify-center gap-3 py-3">
                <View className="w-1/2 flex-1">
                    <Button
                        onPress={() => {
                            if (selected.length === 0) {
                                return Alert.alert(
                                    "Erreur",
                                    "Vous ne pouvez pas démarrer votre programme par du repos",
                                );
                            }
                            if (selected[selected.length - 1].type === "rest") {
                                return Alert.alert(
                                    "Erreur",
                                    "Vous ne pouvez pas mettre deux temps de repos à la suite",
                                );
                            }

                            addRest(15);
                        }}
                    >
                        <Text className="text-accent" numberOfLines={1}>
                            Ajouter temps de repos
                        </Text>
                    </Button>
                </View>
                <View className="w-1/2 flex-1">
                    <Button onPress={() => exoRef.current?.present()}>
                        <Text className="text-accent">Ajouter un exercice</Text>
                    </Button>
                </View>
            </View>
            <Sheet ref={exoRef} snap={["35%", "60%"]}>
                <>
                    <View className="mb-4 items-center">
                        <Text className="text-xl font-bold text-foreground">Veuillez sélectionner des exercices</Text>
                    </View>
                    <View className="flex flex-row flex-wrap justify-center">
                        {exos.map((item: ExoItem, index: number) => (
                            <View className="m-1" key={index}>
                                <TouchableOpacity onPress={() => addExercise(item)}>
                                    <View className="rounded-lg border border-border bg-background p-6">
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
            </Sheet>
        </SafeAreaView>
    );
}
