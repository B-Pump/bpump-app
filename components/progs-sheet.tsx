import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo } from "react";
import { View } from "react-native";

import { useColorScheme } from "@/lib/color";

type Ref = BottomSheetModal;

interface SheetProps {
    snap: string[];
    children: React.ReactNode;
}

export const Sheet = forwardRef<Ref, SheetProps>((props, ref) => {
    const { isDarkColorScheme } = useColorScheme();

    const snapPoints = useMemo(() => props.snap, []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop opacity={0.4} appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
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
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                <View className="p-4">{props.children}</View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
});
