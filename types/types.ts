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
