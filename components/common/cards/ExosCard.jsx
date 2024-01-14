import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './exoscard.style';
import { checkImageURL } from '../../../utils';

const ExosCard = ({ exo, handleNavigate }) => {
    return <>
        <TouchableOpacity style={styles.container} onPress={handleNavigate}>
            <TouchableOpacity style={styles.logoContainer}>
            <Image
                source={{
                    uri: checkImageURL(exo.employer_logo)
                    ? exo.employer_logo
                    : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                }}
                resizeMode='contain'
                style={styles.logoImage}
            />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.exoName} numberOfLines={1}>{exo.exo_title}</Text>
                <Text style={styles.exoType}>{exo.exo_employment_type}</Text>
            </View>
        </TouchableOpacity>
    </>
}

export default ExosCard