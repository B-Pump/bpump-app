import { Text, View, SafeAreaView, ScrollView, RefreshControl, Share } from 'react-native';
import { Stack } from 'expo-router';

import { ScreenHeaderBtn } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';

const ExoDetails = () => {
    return <>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: ""
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Text>Ceci est le détail de l'exercice</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>
}

export default ExoDetails