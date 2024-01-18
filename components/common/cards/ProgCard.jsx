import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './style/progcard.style';
import { checkImageURL } from '../../../utils/checkImageURL';

const ProgCard = ({ item, handleCardPress }) => {
    return <>
        <TouchableOpacity style={styles.container(item)} onPress={() => handleCardPress(item)}>
            <TouchableOpacity style={styles.logoContainer(item)}>
            <Image
                source={{
                    uri: checkImageURL(item.prog_logo)
                    ? item.prog_logo
                    : "https://urlz.fr/pjmg",
                }}
                resizeMode='contain'
                style={styles.logoImage}
            />
            </TouchableOpacity>
            <Text style={styles.companyName} numberOfLines={1}>{item.employer_name}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.progName(item)} numberOfLines={1}>{item.prog_title}</Text>
                <Text style={styles.duration}>{item.prog_duration}</Text>
            </View>
        </TouchableOpacity>
    </>
}

export default ProgCard