import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode, forwardRef, useCallback, useMemo } from "react";
import { Text, View } from "react-native";

import { useColorScheme } from "@/lib/color";

type Ref = BottomSheetModal;

interface SheetProps {
    title: string;
    data: string[];
    children: ReactNode;
}

export const Sheet = forwardRef<Ref, SheetProps>((props, ref) => {
    const { isDarkColorScheme } = useColorScheme();

    const snapPoints = useMemo(() => ["25%", "75%"], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop opacity={0.15} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        [],
    );

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: isDarkColorScheme ? "#363636" : "white" }}
        >
            <View className="p-4">
                <View className="mb-4 items-center">
                    <Text className="text-xl font-bold text-foreground">{props.title}</Text>
                </View>
                {props.children}
            </View>
        </BottomSheetModal>
    );
});
