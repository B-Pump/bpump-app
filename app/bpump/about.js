import { Text, View, SafeAreaView, ScrollView, RefreshControl, Share } from 'react-native';
import { Stack } from 'expo-router';

import { ScreenHeaderBtn } from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import styles from '../../styles/bpump';

const BpumpAbout = () => {
    const onShare = () => {
        Share.share({
            message: "J'ai me suis mit au sport grâce à B-Pump, le coach sportif 100% robotique ! Tu devrais essayer : <lien_vers_le_site_web>"
        });
    }

    return <>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                            handlePress={onShare}
                        />
                    ),
                    headerTitle: "À propos de nous"
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Text>Yoyuoyoyooy</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    </>
}

export default BpumpAbout