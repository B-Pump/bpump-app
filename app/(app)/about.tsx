import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function About() {
    return (
        <SafeAreaView className="flex-1 bg-background px-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mt-3">
                    <Text className="text-2xl text-foreground">Apprenez en plus sur notre projet !</Text>
                    <Text className="text-3xl font-semibold leading-tight text-foreground">Qu'est-ce que B-Pump ?</Text>
                </View>
                <View className="my-3">
                    <Text className="py-2 text-foreground">
                        B-Pump est une initiative passionnée par la santé et le bien-être pour tous. Nous sommes une
                        équipe de six personnes, composée de quatre développeurs junior une designer et un gérant
                        communication, unis par notre amour pour la technologie depuis notre plus jeune âge.
                    </Text>
                    <Text className="py-2 text-foreground">
                        Notre motivation a pris forme devant le défi commun : comment rendre le sport accessible à
                        chacun, où qu'ils soient, sans les contraintes de déplacement ou de coûts liés à une salle de
                        sport. C'est ainsi qu'est né notre projet innovant : un robot de sport révolutionnaire conçu
                        pour guider les utilisateurs dans leurs exercices, que ce soit avec ou sans équipement, tout en
                        veillant à la bonne exécution des mouvements.
                    </Text>
                    <Text className="py-2 text-foreground">
                        Ce qui distingue notre robot, c'est sa capacité unique à fournir des corrections vidéo et orales
                        en temps réel, ainsi qu'une projection au sol pour une visualisation optimale des positions
                        pendant l'exercice. Nous croyons fermement en la simplicité et l'intuitivité de l'utilisation du
                        robot, visant à motiver chacun à adopter une routine sportive régulière depuis le confort de son
                        chez-soi, tout en préservant son intimité.
                    </Text>
                    <Text className="py-2 text-foreground">
                        Au cœur de notre mission se trouve l'idée que le sport devrait être facile, amusant et
                        accessible à tous. Nous sommes actuellement en phase de développement, surmontant divers défis
                        techniques avec des technologies telles que React-Native pour l'application mobile et Blender
                        pour la modélisation 3D du robot.
                    </Text>
                    <Text className="py-2 text-foreground">
                        Si vous souhaitez en savoir plus sur les coulisses de notre développement, n'hésitez pas à
                        consulter nos vidéos qui documentent les différentes phases du projet. Vous pourrez ainsi suivre
                        de près notre évolution et découvrir les défis que nous relevons pour créer une expérience
                        sportive révolutionnaire.
                    </Text>
                    <Text className="py-2 text-foreground">
                        Vous pouvez contribuer à notre projet en partageant des retours constructifs. Rejoignez-nous
                        pour transformer ensemble la façon dont le monde perçoit la santé et le fitness. Merci de faire
                        partie de notre aventure.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
