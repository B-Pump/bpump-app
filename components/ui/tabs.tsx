import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

import { Button } from "@/components/ui/button";

export default function Tabs({ children, item }: { children: React.ReactNode; item: string[] }) {
    const [activeTab, setActiveTab] = useState(item[0]);

    const displayTabContent = () => {
        return <Text className="text-foreground">Salut : {activeTab}</Text>;
    };

    return (
        <>
            <View className="my-3 justify-center items-center">
                <FlatList
                    data={item as string[]}
                    renderItem={({ item, index }) => (
                        <Button
                            className={activeTab === item ? "bg-primary" : "bg-secondary"}
                            variant="ghost"
                            onPress={() => setActiveTab(item)}
                            key={index}
                        >
                            <Text className={activeTab === item ? "text-accent" : "text-foreground"}>{item}</Text>
                        </Button>
                    )}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: 12 }}
                    horizontal
                />
            </View>
            <View className="my-3">{displayTabContent()}</View>
        </>
    );
}
