import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { COLORS, SIZES, icons, images } from "../../constants";
import styles from "./style/exo.style";

const tabs = ["Informations", "Démonstration"];

export default function Exo({ exo, data, load, error }) {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const displayTabContent = () => {
        switch (activeTab) {
            case tabs[0]:
                return (
                    <View style={styles.caseContainer}>
                        <Text style={styles.caseTitle}>En savoir plus sur cet exercice :</Text>
                        <View style={styles.caseDescBox}>
                            <Text style={styles.caseDesc}>{data[exo]?.sugar.description ?? "Aucune données"}</Text>
                        </View>
                    </View>
                );
            case tabs[1]:
                return (
                    <View style={styles.caseContainer}>
                        <Text style={styles.caseTitle}>Comment faire cet exercice :</Text>
                        <View style={styles.caseDescBox}>
                            <Text style={styles.caseDesc}>{data[exo]?.sugar.description ?? "Aucune données"}</Text>
                        </View>
                    </View>
                );
            default:
                break;
        }
    };

    return (
        <>
            {load ? (
                <ActivityIndicator size="large" color={COLORS.light.text} />
            ) : error ? (
                <Text>Erreur lors du chargement des détails de l'exercice</Text>
            ) : (
                <>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLogoBox}>
                            <Image source={images.logo} style={styles.headerLogoImage} />
                        </View>
                        <View style={styles.headerTitleBox}>
                            <Text style={styles.headerTitle}>Exercice - {data[exo]?.sugar.title}</Text>
                        </View>
                        <View style={styles.headerCategoryBox}>
                            <Text style={styles.headerCategory}>{data[exo]?.sugar.category} | </Text>
                            <View style={styles.categoryDifficultyBox}>
                                <Image source={icons.star} resizeMode="contain" style={styles.categoryDifficultyImg} />
                                <Text style={styles.categoryDifficulty}>{data[exo]?.sugar.difficulty}/5</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tabsContainer}>
                        <FlatList
                            data={tabs}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.tabsBtn(item, activeTab)}
                                    onPress={() => setActiveTab(item)}
                                >
                                    <Text style={styles.tabsBtnText(item, activeTab)}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item}
                            contentContainerStyle={{ columnGap: SIZES.small / 2 }}
                        />
                    </View>
                    {displayTabContent()}
                </>
            )}
        </>
    );
}
