import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './programmes.style';
import { COLORS, SIZES } from '../../constants';
import ProgrammesCard from '../common/cards/ProgrammesCard';
import useFetch from '../../hook/useFetch';

const Programmes = () => {
    const router = useRouter();

    const { data, isLoading, error } = useFetch('search', {
        query: "React developer",
        num_pages: 1
    });

    const [selectedProg, setSelectedProg] = useState();

    const handleCardPress = (item) => {
        router.push(`/exo-details/${item.exo_id}`);
        setSelectedProg(item.exo_id)
    }

    return <>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Programmes recommandés</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Afficher tout</Text>
                </TouchableOpacity>
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
                            <ProgrammesCard item={item} selectedProg={selectedProg} handleCardPress={handleCardPress}/>
                        )}
                        keyExtractor={item => item?.exo_id}
                        contentContainerStyle={{ columnGap: SIZES.medium }}
                        horizontal
                    />
                )}
            </View>
        </View>
    </>
}

export default Programmes