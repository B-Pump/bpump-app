interface Exos {
    id: string;
    sugar: {
        title: string;
        description: string;
        category: string;
        difficulty: number;
        muscles: string[];
        security: string[];
        needed: string[];
        energetic: {
            calories: number;
        };
    };
}

interface Progs {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: number;
    hint: string[];
    exercises: string[];
}
