import { Badge } from "@/components/ui/badge";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Ref = BottomSheetModal;
interface SheetProps {
    title: string;
    data: string[];
}

export const Sheet = forwardRef<Ref, SheetProps>((props, ref) => {
    const snapPoints = useMemo(() => ["78%"], []);

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
                <View className="items-center">
                    {props.data.map((item, index) => (
                        <View className="m-1" key={index}>
                            <TouchableOpacity onPress={() => {}}>
                                <Badge variant="outline" label={item} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </BottomSheetModal>
    );
});
