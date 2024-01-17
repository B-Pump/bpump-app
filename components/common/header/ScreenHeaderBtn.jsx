import { useRouter } from 'expo-router';
import { TouchableOpacity, Image } from 'react-native';

import styles from './style/screenheader.style'

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
    const router = useRouter();

    return <>
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            <Image 
                source={iconUrl} 
                resizeMode="cover"
                style={styles.btnImg(dimension)}
            />
        </TouchableOpacity>
    </>
}

export default ScreenHeaderBtn