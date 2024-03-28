import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Text, View } from "react-native";

type Ref = BottomSheetModal;
interface SheetProps {
    title: string;
    data: string[];
    children: React.ReactNode;
}

export const Sheet = forwardRef<Ref, SheetProps>((props, ref) => {
    const snapPoints = useMemo(() => ["75%"], []);

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={{
                backgroundColor: "white",
            }}
        >
            <View className="p-4">
                <View className="mb-4 items-center">
                    <Text className="text-xl font-bold">{props.title}</Text>
                </View>
                {props.children}
            </View>
        </BottomSheetModal>
    );
});
