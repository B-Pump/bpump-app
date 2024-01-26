import { SafeAreaView, ScrollView, View, Text, Button, Image, TouchableOpacity } from "react-native";
import { osInternalBuildId } from "expo-device";

import { useAuth } from "../../../context/auth";
import { version as pkV } from "../../../package.json";
import { expo as cfV } from "../../../app.json";

import { COLORS, SIZES, icons } from "../../../constants";
import styles from "../../../style/settings.style";

export default function Settings() {
    if (pkV !== cfV.version) {
        console.error(
            `Error calculating client version : ${pkV} is different as ${cfV.version}\nPlease upgrade in package.json and app.json`,
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light.background, paddingHorizontal: SIZES.medium }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.settingsTitle}>Configurez votre robot !</Text>
                    <Text style={styles.settingsDesc}>Paramètres</Text>
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.settingsContainerTitle}>Thème de l'application</Text>
                    <View style={styles.settingsContent}>
                        <View style={styles.objectContainer(false, true)}>
                            <Image source={icons.theme} resizeMode="cover" style={styles.themeImg} />
                            <Text>Automatique</Text>
                        </View>
                        <View style={styles.objectContainer(true, true)}>
                            <Image source={icons.sun} resizeMode="cover" style={styles.themeImg} />
                            <Text>Clair</Text>
                        </View>
                        <View style={styles.objectContainer(true, true)}>
                            <Image source={icons.moon} resizeMode="cover" style={styles.themeImg} />
                            <Text>Sombre</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.settingsContainerTitle}>Informations complémentaires</Text>
                    <View style={styles.settingsContent}>
                        <View style={[styles.objectContainer(false, true), styles.deviceInfo]}>
                            <Text>ID de l'appareil :</Text>
                            <Text>{osInternalBuildId}</Text>
                        </View>
                        <View style={[styles.objectContainer(true, true), styles.deviceInfo]}>
                            <Text>Version du client :</Text>
                            <Text>{pkV || cfV}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.settingsContainerTitle}>Actions sur votre compte</Text>
                    <View style={styles.settingsContent}>
                        <View style={styles.objectContainer(false, false)}>
                            <Text>
                                Vous déconnecter vous raménera à l'écran d'accueil. Vous pourrez toujours utiliser votre
                                compte et vos programmes seront sauvegardés.
                            </Text>
                            <TouchableOpacity style={styles.accountBtn} onPress={useAuth().signOut}>
                                <Text style={styles.accountBtnTxt}>Vous déconnecter</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.objectContainer(true, false)}>
                            <Text>
                                Supprimer votre compte est une action irréversible. Cela supprimera vos programmes et
                                votre activité.
                            </Text>
                            <TouchableOpacity style={styles.accountBtn} onPress={useAuth().signOut}>
                                <Text style={styles.accountBtnTxt}>Supprimer votre compte</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
