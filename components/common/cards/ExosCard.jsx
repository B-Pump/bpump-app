import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './style/exoscard.style';
import { checkImageURL } from '../../../utils/checkImageURL';

const ExosCard = ({ item, handleCardPress }) => {
    return <>
        <TouchableOpacity style={styles.container} onPress={(handleCardPress(item))}>
            <TouchableOpacity style={styles.logoContainer}>
            <Image
                source={{
                    uri: checkImageURL(item.exo_logo)
                    ? item.exo_logo
                    : "https://urlz.fr/pjmA",
                }}
                resizeMode='contain'
                style={styles.logoImage}
            />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.exoName} numberOfLines={1}>{item.exo_title}</Text>
                <Text style={styles.exoType}>{item.exo_type}</Text>
            </View>
        </TouchableOpacity>
    </>
}

export default ExosCard