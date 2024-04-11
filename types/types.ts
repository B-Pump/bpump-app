interface ExoItem {
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
}

interface ProgItem {
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

interface ChartDataItem {
    message: string;
    data: {
        value: number;
        time: number;
    }[];
}
