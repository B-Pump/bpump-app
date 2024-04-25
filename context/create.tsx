import { create } from "zustand";

type CreateStoreType = {
    selected: SelectedItem[];
    setSelected: (callback: (prevSelected: SelectedItem[]) => SelectedItem[]) => void;
};

/**
 * State manager for program creation
 * @author wiizz
 * @returns {UseBoundStore<StoreApi<CreateStoreType>>}
 */
export const useCreateStore = create<CreateStoreType>((set) => ({
    selected: [],
    setSelected: (callback) => set((state) => ({ selected: callback(state.selected) })),
}));

export function useCreateStoreActions() {
    const { setSelected } = useCreateStore();

    // Inside the 'setSelected' callback, it creates a new object with a 'type' property set to 'exercise', an 'exo' property set to the 'exercise' argument, and a 'reps' property set to 3.
    // Then it uses the spread operator to create a new array that includes all the elements of the 'prevSelected' array, followed by the new object.
    // Finally, it returns the new array.
    const addExercise = (exercise: ExosList) =>
        setSelected((prevSelected) => [...prevSelected, { type: "exercise", exo: exercise, reps: 3 }]);

    // Same as addExercise
    const addRest = (duration: number) => setSelected((prevSelected) => [...prevSelected, { type: "rest", duration }]);

    // Then it uses 'splice' to modify the 'newSelected' array in-place, starting at the given 'index' and removing 1 element.
    // Finally, it returns the modified 'newSelected' array.
    const removeItem = (index: number) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];
            newSelected.splice(index, 1);

            return newSelected;
        });
    };

    // Then it checks if the item at the given 'index' has a 'type' of 'exercise'.
    // If it does, it creates a new object with the same properties as the original item, but with the 'reps' property updated to 'newReps'.
    // Finally, it returns the modified 'newSelected' array.
    const updateExerciseReps = (index: number, newReps: number) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];
            const item = newSelected[index];

            if (item.type === "exercise") newSelected[index] = { ...item, reps: newReps };

            return newSelected;
        });
    };

    // It checks if the item at the given 'index' has a 'type' of 'rest'.
    // If it does, it creates a new object with the same properties as the original item, but with the 'duration' property updated to 'newDuration'.
    // Finally, it returns the modified 'newSelected' array.
    const updateRestDuration = (index: number, newDuration: number) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];
            const item = newSelected[index];

            if (item.type === "rest") newSelected[index] = { ...item, duration: newDuration };

            return newSelected;
        });
    };

    return { addExercise, addRest, removeItem, updateExerciseReps, updateRestDuration };
}
