import React, { createContext, useContext, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { Button } from "@/components/ui/button";

interface TabsContextProps {
    activeTab: string;
    setActiveTab: (id: string) => void;
}

interface TabsProps {
    defaultValue: string;
    children: React.JSX.Element;
}

const TabsContext = createContext<TabsContextProps>({
    activeTab: "",
    setActiveTab: () => {},
});

export function Tabs({ defaultValue, children }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;
}

export function TabsTrigger({ data }) {
    const { activeTab, setActiveTab } = useContext(TabsContext);

    return (
        <View className="my-3 items-center justify-center">
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <Button
                        variant={activeTab === item ? "default" : "secondary"}
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
    );
}

export function TabsContent({ value, ...props }) {
    const { activeTab } = useContext(TabsContext);

    if (value === activeTab) return <View {...props} />;
    return null;
}
