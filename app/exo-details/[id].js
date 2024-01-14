import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { ScreenHeaderBtn } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hook/useFetch';

const ExoDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useFetch('exo-details', {
        exo_id: params.id
    });

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])

    return <>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: ""
                }}
            />
            <>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                    }
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary}/>
                    ) : error ? (
                        <Text>Erreur lors de l'affichage des détails du programme</Text>
                    ) : data.length === 0 ? (
                        <Text>Aucune données</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>

                        </View>
                    )}
                </ScrollView>
            </>
        </SafeAreaView>
    </>
}

export default ExoDetails