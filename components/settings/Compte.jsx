import { Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../../context/auth";

import styles from "./style/compte.style";

export default function Compte() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>⚠️ Actions sur votre compte</Text>
            <View style={styles.content}>
                <View style={styles.object(false)}>
                    <Text>
                        Vous déconnecter vous raménera à l'écran d'accueil. Vous pourrez toujours utiliser votre compte
                        et vos programmes seront sauvegardés.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={useAuth().signOut}>
                        <Text style={styles.buttonText}>Vous déconnecter</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.object(true)}>
                    <Text>
                        Supprimer votre compte est une action irréversible. Cela supprimera vos programmes et votre
                        activité.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                        <Text style={styles.buttonText}>Supprimer votre compte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
