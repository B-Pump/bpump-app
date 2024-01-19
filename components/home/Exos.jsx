import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import { useTheme } from '../../utils/themeProvider';
import { ExosCard } from '../common/cards/ExosCard';
import useFetch from '../../hook/useFetch';

import styles from './style/exos.style';
import { COLORS, SIZES } from '../../constants';

/**
 * Composant représentant la section des exercices recommandés
 * @returns {React.ReactNode} - Composant de la section des exercices recommandés
 */
const Exos = () => {
    const router = useRouter();
    const { data, isLoading, error } = useFetch('search', {
        // utilisation API
    });

    return <>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: useTheme().colors.text }]}>Exercices recommandés</Text>
                <Pressable
                    style={({ pressed }) => [{opacity: pressed ? 0.5 : 1}]}
                    onPress={() => {}}
                >
                    <Text style={[styles.headerBtn, { color: useTheme().colors.showall }]}>Afficher tout</Text>
                </Pressable>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : error ? (
                    <Text>Erreur lors du chargement des exercices</Text>
                ) : (
                    data?.map((item) => (
                        <ExosCard
                            item={item}
                            key={`liste-exo-${item?.exo_id}`}
                            handleCardPress={() => router.push(`/exo-details/${item.exo_id}`)}
                        />
                    ))
                )}
            </View>
        </View>
    </>
}

export default Exos