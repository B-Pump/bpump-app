interface Exos {
    id: string;
    icon: string;
    title: string;
    description: string;
    category: string;
    difficulty: number;
    video: string;
    muscles: string[];
    security: string[];
    needed: string[];
    calories: number;
    camera: string;
    projector: string[];
}

interface Progs {
    id: string;
    owner: string;
    icon: string;
    title: string;
    description: string;
    category: string;
    difficulty: number;
    hint: string[];
    exercises: string[];
}

interface ExosData {
    data: Exos[];
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

interface ProgsData {
    data: Progs[];
    isLoading: boolean;
    error: boolean;
    refetch: () => void;
}

interface ChartDataItem {
    message: string;
    data: {
        value: number;
        time: number;
    }[];
}
