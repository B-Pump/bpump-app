import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import useFetch from "../../context/api";
import { ExosCard } from "../common/cards/ExosCard";

import { COLORS, SIZES, icons, images } from "../../constants";
import styles from "./style/prog.style";

export default function Prog({ data, load, error }) {
    const { data: exoData, isLoading: exoLoad, error: exoError } = useFetch("GET", "exos/all", {});

    const tabs = ["Informations", "Liste des exercices"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const displayTabContent = () => {
        switch (activeTab) {
            case tabs[0]:
                return (
                    <View style={styles.caseContainer}>
                        <Text style={styles.caseTitle}>En savoir plus sur ce programme</Text>
                        <View style={styles.caseBox}>
                            <Text style={styles.caseBoxTitle}>📜​ Description :</Text>
                            <Text style={styles.caseInfo}>{data?.description ?? "Aucune données"}</Text>
                        </View>
                    </View>
                );
            case tabs[1]:
                return (
                    <View style={styles.caseContainer}>
                        <Text style={styles.caseTitle}>Catalogue de ce programme</Text>
                        <View style={styles.caseBox}>
                            {data?.exercises?.map((item, index) => {
                                const exoItem = exoData.find((exo) => exo.id === item);

                                return (
                                    <View key={index}>
                                        {exoLoad ? (
                                            <ActivityIndicator size="large" color={COLORS.light.text} />
                                        ) : exoError ? (
                                            <Text>Erreur lors du chargement des détails de l'exercice</Text>
                                        ) : exoItem ? (
                                            <View style={{ paddingBottom: 10 }}>
                                                <ExosCard data={exoItem} load={exoLoad} error={exoError} />
                                            </View>
                                        ) : (
                                            <Text>Aucun détail trouvé pour l'exercice {item}</Text>
                                        )}
                                    </View>
                                );
                            })}
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
                <Text>Erreur lors du chargement des détails du programme</Text>
            ) : (
                <>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLogoBox}>
                            <Image source={images.logo} style={styles.headerLogoImage} />
                        </View>
                        <View style={styles.headerTitleBox}>
                            <Text style={styles.headerTitle}>Programme - {data?.title}</Text>
                        </View>
                        <View style={styles.headerCategoryBox}>
                            <Text style={styles.headerCategory}>{data?.category} | </Text>
                            <View style={styles.categoryDifficultyBox}>
                                <Image source={icons.star} resizeMode="contain" style={styles.categoryDifficultyImg} />
                                <Text style={styles.categoryDifficulty}>{data?.difficulty}/5</Text>
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
