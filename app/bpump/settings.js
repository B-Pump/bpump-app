import { Text, View, SafeAreaView, ScrollView, RefreshControl, Share } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, SIZES } from '../../constants';
import styles from '../../styles/bpump';

const BpumpSettings = () => {
    return <>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: "Paramètres"
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Text>Ceci sont les paramètres</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>
}

export default BpumpSettings