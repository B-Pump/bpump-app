import { create } from "zustand";

type DataStoreType = {
    selected: SelectedItem[];
    setSelected: (callback: (prevSelected: SelectedItem[]) => SelectedItem[]) => void;
};

/**
 * State manager for program creation
 * @author wiizz
 * @returns {UseBoundStore<StoreApi<DataStoreType>>}
 */
export const useCreateStore = create<DataStoreType>((set) => ({
    selected: [],
    setSelected: (callback) => set((state) => ({ selected: callback(state.selected) })),
}));

export function useCreateStoreActions() {
    const { setSelected } = useCreateStore();

    const addExercise = (exercise: ExosList) =>
        setSelected((prevSelected) => [...prevSelected, { type: "exercise", exo: exercise, reps: 3 }]);

    const addRest = (duration: number) => setSelected((prevSelected) => [...prevSelected, { type: "rest", duration }]);

    const removeItem = (index: number) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];
            newSelected.splice(index, 1);

            return newSelected;
        });
    };

    const updateExerciseReps = (index: number, newReps: number) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];
            const item = newSelected[index];

            if (item.type === "exercise") newSelected[index] = { ...item, reps: newReps };

            return newSelected;
        });
    };

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
