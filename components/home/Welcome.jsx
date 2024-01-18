import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import { icons, SIZES } from '../../constants';
import styles from './style/welcome.style';

/**
 * Composant représentant l'écran de bienvenue (accueil) de l'application
 * @param {Object} props - Propriétés du composant
 * @param {string} props.searchTerm - Mots de recherche saisie par l'utilisateur dans le TextInput
 * @param {Function} props.setSearchTerm - Fonction pour mettre à jour le terme de recherche
 * @param {Function} props.handleClick - Fonction appelée lorsqu'on appuie sur le bouton de recherche
 * @returns {React.ReactNode} - Composant de l'écran de bienvenue
 */
const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
    const router = useRouter();

    return <>
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Bonjour, je suis B-Pump !</Text>
                <Text style={styles.welcomeMessage}>Trouvez votre programme d'entraînement parfait !</Text>
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
                <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={["Haut du corps", "Bas du corps", "Cardio", "Flexibilité"]}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.tab(item)}
                            onPress={() => {
                                router.push(`/search/${item}`)
                            }}
                        >
                            <Text style={styles.tabText(item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />
            </View>
        </View>
    </>
}

export default Welcome