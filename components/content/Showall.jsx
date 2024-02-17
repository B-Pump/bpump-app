import { useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

import { ExosCard } from "../common/cards/ExosCard";

import { COLORS, SIZES } from "../../constants";
import styles from "./style/showall.style";

export default function Showall({ data, load, error }) {
    const tabs = ["Tout", ...[...new Set(data.map((item) => item.sugar.category))]];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const displayTabContent = () => {
        switch (activeTab) {
            case tabs[0]:
                return data?.map((item, index) => <ExosCard data={item} load={load} error={error} key={index} />);
            default:
                return data?.map((item, index) => {
                    if (item.sugar.category === activeTab) {
                        return <ExosCard data={item} load={load} error={error} key={index} />;
                    }
                    return null;
                });
        }
    };

    return (
        <>
            {load ? (
                <ActivityIndicator size="large" color={COLORS.light.text} />
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Tous les exercices</Text>
                        <Text style={styles.desc}>Préparez vous à faire du sport !</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        {load ? (
                            <ActivityIndicator size="large" color={COLORS.light.text} />
                        ) : error ? (
                            <Text>{error}</Text>
                        ) : (
                            <>
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
                    </View>
                </>
            )}
        </>
    );
}
