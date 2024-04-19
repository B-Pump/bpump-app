import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo } from "react";
import { View } from "react-native";

import { useColorScheme } from "@/lib/color";

type Ref = BottomSheetModal;

interface SheetProps {
    snap: string[];
    children: React.JSX.Element;
}

/**
 * Component giving a bottom sheet menu with a children inside
 * @author wiizz
 * @param {SheetProps} props {@link SheetProps SheetProps}
 * @param {Ref} ref {@link BottomSheetModal BottomSheetModal}
 * @returns {React.JSX.Element}
 */
export const Sheet = forwardRef<Ref, SheetProps>((props, ref): React.JSX.Element => {
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
