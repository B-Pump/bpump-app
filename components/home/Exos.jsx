import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import ExosCard from "../common/cards/ExosCard";

import { COLORS } from "../../constants";
import styles from "./style/exos.style";

export default function Exos() {
    let data = [
        // FIXME: This are only exemples on what the API will give us
        {
            title: "Squats",
            description:
                "Les squats sont un exercice polyarticulaire qui cible les muscles des jambes, des fesses et du bas du dos. Tenez-vous debout, fléchissez vos genoux et vos hanches pour descendre en position accroupie, puis remontez.",
            category: "Bas du corps",
            difficulty: 3,
        },
        {
            title: "Tractions",
            description:
                "Les tractions sont un exercice efficace pour renforcer les muscles du dos, des épaules et des bras. Accrochez-vous à une barre fixe, tendez vos bras et tirez votre corps vers le haut en utilisant la force de vos muscles du dos et de vos bras.",
            category: "Haut du corps",
            difficulty: 4,
        },
        {
            title: "Deadlift",
            description:
                "Le deadlift (soulevé de terre) est un exercice de base qui cible les muscles du dos, des fesses, des ischio-jambiers et des lombaires. En partant d'une position debout, baissez-vous en gardant le dos droit pour saisir une barre, puis redressez-vous en soulevant la charge.",
            category: "Bas du corps",
            difficulty: 4,
        },
        {
            title: "Dips",
            description:
                "Les dips sont un exercice de musculation pour les triceps et les muscles de la poitrine. Utilisez des barres parallèles, abaissez votre corps en pliant les coudes, puis remontez en utilisant la force de vos bras.",
            category: "Haut du corps",
            difficulty: 3,
        },
        {
            title: "Burpees",
            description:
                "Les burpees sont un exercice complet qui combine des mouvements de flexion, d'extension, de saut et de pompe. Commencez en position debout, effectuez une flexion, une pompe, un saut, puis répétez. Cet exercice est idéal pour le renforcement cardiovasculaire.",
            category: "Cardio",
            difficulty: 3,
        },
    ];
    let error = false;
    let isLoading = false;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Exercices recommandés</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.headerBtn}>Afficher tout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.light.text} />
                ) : error ? (
                    <Text>Erreur lors du chargement des exercices</Text>
                ) : (
                    data?.map((item, index) => <ExosCard exo={item} key={index} />)
                )}
            </View>
        </View>
    );
}
