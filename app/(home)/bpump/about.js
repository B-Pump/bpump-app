import { SafeAreaView, ScrollView, Text } from "react-native";

import { COLORS, SIZES } from "../../../constants";

export default function About() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, padding: SIZES.medium }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text>
                    B-Pump est une initiative passionnée par la santé et le bien-être pour tous. Nous sommes une équipe
                    de six personnes, composée de quatre développeurs et deux designers, unis par notre amour pour la
                    technologie depuis notre plus jeune âge.
                </Text>
                <Text>
                    Notre motivation a pris forme devant le défi commun : comment rendre le sport accessible à chacun,
                    où qu'ils soient, sans les contraintes de déplacement ou de coûts liés à une salle de sport. C'est
                    ainsi qu'est né notre projet innovant : un robot de sport révolutionnaire conçu pour guider les
                    utilisateurs dans leurs exercices, que ce soit avec ou sans équipement, tout en veillant à la bonne
                    exécution des mouvements.
                </Text>
                <Text>
                    Ce qui distingue notre robot, c'est sa capacité unique à fournir des corrections vidéo et orales en
                    temps réel, ainsi qu'une projection au sol pour une visualisation optimale des positions pendant
                    l'exercice. Nous croyons fermement en la simplicité et l'intuitivité de l'utilisation du robot,
                    visant à motiver chacun à adopter une routine sportive régulière depuis le confort de son chez-soi,
                    tout en préservant son intimité.
                </Text>
                <Text>
                    Au cœur de notre mission se trouve l'idée que le sport devrait être facile, amusant et accessible à
                    tous. Nous sommes actuellement en phase de développement, surmontant divers défis techniques avec
                    des technologies telles que React-Native pour l'application mobile et Blender pour la modélisation
                    3D du robot.
                </Text>
                <Text>
                    Si vous souhaitez en savoir plus sur les coulisses de notre développement, n'hésitez pas à consulter
                    nos vidéos qui documentent les différentes phases du projet. Vous pourrez ainsi suivre de près notre
                    évolution et découvrir les défis que nous relevons pour créer une expérience sportive
                    révolutionnaire.
                </Text>
                <Text>
                    Vous pouvez contribuer à notre projet en partageant des retours constructifs. Rejoignez-nous pour
                    transformer ensemble la façon dont le monde perçoit la santé et le fitness. Merci de faire partie de
                    notre aventure
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
