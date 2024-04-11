import { create } from "zustand";

type DataStoreType = {
    exos: ExoItem[];
    progs: ProgItem[];
    setExos: (exos: ExoItem[]) => void;
    setProgs: (exos: ProgItem[]) => void;
};

export const useDataStore = create<DataStoreType>((set) => ({
    exos: [],
    progs: [],
    setExos: (exos) => set({ exos }),
    setProgs: (progs) => set({ progs }),
}));
