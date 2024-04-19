import { UseBoundStore, create } from "zustand";

type DataStoreType = {
    exos: ExoItem[];
    progs: ProgItem[];
    metabolism: MetaItem[];
    setExos: (exos: ExoItem[]) => void;
    setProgs: (exos: ProgItem[]) => void;
    setMeta: (metabolism: MetaItem[]) => void;
};

/**
 * State manager for API data
 * @author wiizz
 * @returns {UseBoundStore<StoreApi<DataStoreType>>}
 * @see https://github.com/B-Pump/bpump-api
 */
export const useDataStore = create<DataStoreType>((set) => ({
    exos: [],
    progs: [],
    metabolism: [],
    setExos: (exos) => set({ exos }),
    setProgs: (progs) => set({ progs }),
    setMeta: (metabolism) => set({ metabolism }),
}));
