import { applicationId } from "expo-application";
import { osInternalBuildId } from "expo-device";
import { Text, View } from "react-native";

import { expo as cfV } from "../../app.json";
import { version as pkV } from "../../package.json";

import styles from "./style/infos.style";

export default function Infos() {
    if (pkV !== cfV.version) {
        console.error(
            `Error calculating client version : ${pkV} is different as ${cfV.version}\nPlease upgrade in package.json and app.json`,
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📱​ Informations complémentaires</Text>
            <View style={styles.content}>
                <View style={[styles.object(false), styles.info]}>
                    <Text>Nom de l'appareil :</Text>
                    <Text>{applicationId}</Text>
                </View>
                <View style={[styles.object(true), styles.info]}>
                    <Text>ID de l'appareil :</Text>
                    <Text>{osInternalBuildId}</Text>
                </View>
                <View style={[styles.object(true), styles.info]}>
                    <Text>Version du client :</Text>
                    <Text>{pkV || cfV}</Text>
                </View>
            </View>
        </View>
    );
}
