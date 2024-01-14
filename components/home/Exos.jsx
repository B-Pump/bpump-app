import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './exos.style';
import { COLORS, SIZES } from '../../constants';
import ExosCard from '../common/cards/ExosCard';
import useFetch from '../../hook/useFetch';

const Exos = () => {
    const router = useRouter();

    const { data, isLoading, error } = useFetch('search', {
        query: "React developer",
        num_pages: 1
    });

    return <>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Exercices recommandés</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Afficher tout</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : error ? (
                    <Text>Erreur lors du chargement des exercices</Text>
                ) : (
                    data?.map((exo) => (
                        <ExosCard
                            exo={exo}
                            key={`liste-exo-${exo?.exo_id}`}
                            handleNavigate={() => router.push(`/exo-details/${exo.exo_id}`)}
                        />
                    ))
                )}
            </View>
        </View>
    </>
}

export default Exos