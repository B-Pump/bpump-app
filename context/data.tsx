import { create } from "zustand";

type DataStoreType = {
    exos: ExoItem[];
    progs: ProgItem[];
    metabolism: MetaItem[];
    setExos: (exos: ExoItem[]) => void;
    setProgs: (exos: ProgItem[]) => void;
    setMeta: (metabolism: MetaItem[]) => void;
};

export const useDataStore = create<DataStoreType>((set) => ({
    exos: [],
    progs: [],
    metabolism: [],
    setExos: (exos) => set({ exos }),
    setProgs: (progs) => set({ progs }),
    setMeta: (metabolism) => set({ metabolism }),
}));
