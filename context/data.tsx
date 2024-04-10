import { create } from "zustand";

type DataStoreType = {
    exos: Exos[];
    progs: Progs[];
    setExos: (exos: Exos[]) => void;
    setProgs: (exos: Progs[]) => void;
};

export const useDataStore = create<DataStoreType>((set) => ({
    exos: [],
    progs: [],
    setExos: (exos) => set({ exos }),
    setProgs: (progs) => set({ progs }),
}));
