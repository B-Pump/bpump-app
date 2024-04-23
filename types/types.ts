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
    reps: number[];
    rest: number[];
}

interface MetaItem {
    weight: number;
    height: number;
    age: number;
    sex: string;
}

interface ChartDataItem {
    total_energy: number;
    energy: {
        value: number;
        label: string;
    }[];
    speed: {
        value: number;
        label: string;
    }[];
    force: {
        value: number;
        label: string;
    }[];
}

interface ExosList {
    id: string;
    title: string;
    icon: string;
}

type SelectedItem =
    | {
          type: "exercise";
          exo: ExosList;
          reps: number;
      }
    | {
          type: "rest";
          duration: number;
      };
