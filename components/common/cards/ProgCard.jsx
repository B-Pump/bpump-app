import { View, Text, Pressable, Image } from 'react-native';

import styles from './style/progcard.style';
import { checkImageURL } from '../../../utils/checkImageURL';

/**
 * Composant représentant une carte cliquable pour accèder aux détails du programme
 * @param {Object} props - Propriété du composant
 * @param {Object} props.item - Informations sur le programme à afficher sur la carte
 * @param {Function} props.handleCardPress - Fonction appelée lorsqu'on appuie sur la carte
 * @returns {React.ReactNode} - Composant de la carte du programme
 */
const ProgCard = ({ item, handleCardPress }) => {
    return <>
        <Pressable 
            style={({ pressed }) => [{opacity: pressed ? 0.5 : 1}, styles.container(item)]}
            onPress={() => handleCardPress(item)}
        >
            <Pressable style={({ pressed }) => [{opacity: pressed ? 0.5 : 1}, styles.logoContainer(item)]}>
            <Image
                source={{
                    uri: checkImageURL(item.prog_logo)
                    ? item.prog_logo
                    : "https://urlz.fr/pjmg",
                }}
                resizeMode='contain'
                style={styles.logoImage}
            />
            </Pressable>
            <Text style={styles.companyName} numberOfLines={1}>{item.employer_name}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.progName(item)} numberOfLines={1}>{item.prog_title}</Text>
                <Text style={styles.duration}>{item.prog_duration}</Text>
            </View>
        </Pressable>
    </>
}

export default ProgCard