import { View, Text, TextInput, Pressable, Image, FlatList } from "react-native"
import { useRouter } from "expo-router"

import { useTheme } from "../../utils/themeProvider"

import { icons, SIZES } from "../../constants"
import styles from "./style/welcome.style"

/**
 * Composant représentant l'écran de bienvenue (accueil) de l'application
 * @param {Object} props - Propriétés du composant
 * @param {string} props.searchTerm - Mots de recherche saisie par l'utilisateur dans le TextInput
 * @param {Function} props.setSearchTerm - Fonction pour mettre à jour le terme de recherche
 * @param {Function} props.handleClick - Fonction appelée lorsqu'on appuie sur le bouton de recherche
 * @returns {React.ReactNode} - Composant de l'écran de bienvenue
 */
const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
    const router = useRouter()

    return (
        <View>
            <View style={styles.container}>
                <Text
                    style={[styles.userName, { color: useTheme().colors.text }]}
                >
                    Bonjour, je suis B-Pump !
                </Text>
                <Text
                    style={[
                        styles.welcomeMessage,
                        { color: useTheme().colors.text },
                    ]}
                >
                    Trouvez votre programme d'entraînement parfait !
                </Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder="Que recherchez vous ?"
                    />
                </View>
                <Pressable
                    style={({ pressed }) => [
                        {
                            opacity: pressed ? 0.5 : 1,
                            backgroundColor: useTheme().colors.icon,
                        },
                        styles.searchBtn,
                    ]}
                    onPress={handleClick}
                >
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={[
                            styles.searchBtnImage,
                            { tintColor: useTheme().colors.background },
                        ]}
                    />
                </Pressable>
            </View>
            <View style={styles.tabsContainer}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={[
                        "Haut du corps",
                        "Bas du corps",
                        "Cardio",
                        "Flexibilité",
                    ]}
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => [
                                { opacity: pressed ? 0.5 : 1 },
                                styles.tab,
                            ]}
                            onPress={() => {
                                router.push(`/search/${item}`)
                            }}
                        >
                            <Text style={styles.tabText}>{item}</Text>
                        </Pressable>
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />
            </View>
        </View>
    )
}

export default Welcome
