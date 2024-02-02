import { ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, LogBox, Text, TouchableOpacity, View } from "react-native";

import { COLORS, SIZES, icons, images } from "../../constants";
import styles from "./style/exo.style";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // avoid "new NativeEventEmitter" logs which are due to a version bug between expo_sdk v50 and expo-av

export default function Exo({ exo, data, load, error }) {
    const tabs = ["Informations", "Démonstration"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const videoRef = useRef(null);
    const [video, setVideo] = useState({});

    const displayTabContent = () => {
        switch (activeTab) {
            case tabs[0]:
                return (
                    <View style={styles.caseContainer}>
                        <Text style={styles.caseTitle}>En savoir plus sur cet exercice</Text>
                        <View style={styles.caseBox}>
                            <Text style={styles.caseBoxTitle}>Description :</Text>
                            <Text style={styles.caseInfo}>{data[exo]?.sugar.description ?? "Aucune données"}</Text>
                        </View>
                        <View style={styles.caseBox}>
                            <Text style={styles.caseBoxTitle}>Muscles sollicités :</Text>
                            {data[exo]?.sugar.muscles?.map((item, index) => (
                                <Text style={styles.caseInfo} key={index}>
                                    {"\u2022 "}
                                    {item ?? "Aucune données"}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.caseBox}>
                            <Text style={styles.caseBoxTitle}>Consignes de sécurité :</Text>
                            {data[exo]?.sugar.security?.map((item, index) => (
                                <Text style={styles.caseInfo} key={index}>
                                    {"\u2022 "}
                                    {item ?? "Aucune données"}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.caseBox}>
                            <Text style={styles.caseBoxTitle}>Préréquis :</Text>
                            {data[exo]?.sugar.needed?.map((item, index) => (
                                <Text style={styles.caseInfo} key={index}>
                                    {"\u2022 "}
                                    {item ?? "Aucune données"}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.caseBox}>
                            <Text style={styles.caseBoxTitle}>Dépenses énergétiques :</Text>
                            <Text style={styles.caseInfo}>
                                <Text>
                                    Calories brulées pour 10 reps :{" "}
                                    {data[exo]?.sugar.energetic.calories ?? "Aucune données"} kcal
                                </Text>
                            </Text>
                        </View>
                    </View>
                );
            case tabs[1]:
                return (
                    <View style={styles.caseContainer}>
                        <Text style={styles.caseTitle}>Comment faire cet exercice :</Text>
                        <View style={styles.caseBox}>
                            <Text style={styles.caseBoxTitle}>Vidéo :</Text>
                            <Video
                                ref={videoRef}
                                style={styles.video}
                                source={{
                                    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                                }}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                onPlaybackStatusUpdate={(status) => setVideo(() => status)}
                            />
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
