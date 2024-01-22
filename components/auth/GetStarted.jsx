import { useRouter } from "expo-router"
import { View, Text, TouchableOpacity, Image } from "react-native"

import { useTheme } from "../../utils/themeProvider"

import { SIZES, images, COLORS } from "../../constants"
import styles from "./style/getstarted.style"

const GetStarted = ({ login }) => {
    const router = useRouter()

    const handleLogin = () => {
        login(true)
    }
    return (
        <View style={{ backgroundColor: useTheme().colors.background }}>
            <View>
                <TouchableOpacity onPress={handleLogin}>
                    <Text>Se connecter</Text>
                </TouchableOpacity>
                <Image
                    source={images.traction}
                    style={styles.startImg("-15deg")}
                />
                <Image
                    source={images.pompes}
                    style={styles.startImg("15deg")}
                />
                <Image
                    source={images.haltere}
                    style={styles.startImg("-15deg")}
                />
                <Image
                    source={images.abdos}
                    style={styles.startImg("-15deg")}
                />
            </View>
            <View>
                <Text style={styles.startTitle}>
                    Commencez dès{"\n"}maintenant
                </Text>
                <Text style={styles.startDesc}>
                    La perfection dans chaque mouvements.{"\n\n"}
                    Améliorez la justesse de vos postures grâce à B-Pump, votre
                    coach sportif 100% Robotique !
                </Text>
            </View>
            <View style={styles.startBtnContainer}>
                <TouchableOpacity
                    style={styles.startBtn}
                    onPress={() => router.push("/auth/signup")}
                >
                    <Text style={{ color: COLORS.lightWhite }}>Démarrer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/auth/login")}>
                    <Text style={styles.startAccount}>
                        Vous avez déjà un compte ?
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GetStarted
