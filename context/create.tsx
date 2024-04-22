import { UseBoundStore, create } from "zustand";

type DataStoreType = {
    selected: ExosList[];
    setSelected: (selected: ExosList[]) => void;
};

/**
 * State manager for program creation
 * @author wiizz
 * @returns {UseBoundStore<StoreApi<DataStoreType>>}
 */
export const useCreateStore = create<DataStoreType>((set) => ({
    selected: [],
    setSelected: (selected) => set({ selected }),
}));
