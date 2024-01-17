import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './style/prog.style';
import { COLORS, SIZES } from '../../constants';
import ProgCard from '../common/cards/ProgCard';
import useFetch from '../../hook/useFetch';

const Prog = () => {
    const router = useRouter();
    const { data, isLoading, error } = useFetch('search', {
        // utilisation API
    });

    return <>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Programmes recommandés</Text>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : error ? (
                    <Text>Erreur lors du chargement des programmes</Text>
                ) : (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data = {data}
                        renderItem={({ item }) => (
                            <ProgCard 
                                item={item} 
                                handleCardPress={() => router.push(`/prog-details/${item.prog_id}`)}
                            />
                        )}
                        keyExtractor={item => item?.prog_id}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    </>
}

export default Prog