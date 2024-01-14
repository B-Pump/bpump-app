import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { icons, SIZES } from '../../constants';

const exoTypes = ["Haut du corps", "Bas du corps", "Cardio"]

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
    const router = useRouter();
    const [activeExoType, setActiveExoType] = useState("");

    return <>
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Bonjour Pierre !</Text>
                <Text style={styles.welcomeMessage}>Trouvez votre programme d'entraînement parfait !</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder="Que recherchez vous ?"
                    />
                </View>
                <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>
            {/* <View style={styles.tabsContainer}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={exoTypes}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.tab(activeExoType, item)}
                            onPress={() => {
                                setActiveExoType(item);
                                router.push(`/search/${item}`)
                            }}
                        >
                            <Text style={styles.tabText(activeExoType, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />
            </View> */}
        </View>
    </>
}

export default Welcome