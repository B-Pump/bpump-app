import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './programmescard.style';
import { checkImageURL } from '../../../utils';

const ProgrammesCard = ({ item, selectedExo, handleCardPress }) => {
    return <>
        <TouchableOpacity 
            style={styles.container(selectedExo, item)} 
            onPress={() => handleCardPress(item)}
        >
            <TouchableOpacity style={styles.logoContainer(selectedExo, item)}>
            <Image
                source={{
                    uri: checkImageURL(item.employer_logo)
                    ? item.employer_logo
                    : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
                }}
                resizeMode='contain'
                style={styles.logoImage}
            />
            </TouchableOpacity>
            <Text style={styles.companyName} numberOfLines={1}>{item.employer_name}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.exoName(selectedExo, item)} numberOfLines={1}>{item.exo_title}</Text>
                <Text style={styles.location}>{item.exo_country}</Text>
            </View>
        </TouchableOpacity>
    </>
}

export default ProgrammesCard