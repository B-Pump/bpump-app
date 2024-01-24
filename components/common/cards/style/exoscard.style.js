import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: COLORS.white,
        ...SHADOWS.small,
        shadowColor: COLORS.primary,
    },
    logoContainer: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.light.background,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImage: {
        width: "70%",
        height: "70%",
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium,
    },
    exoName: {
        fontSize: SIZES.medium,
        fontFamily: "DMBold",
        color: COLORS.secondary,
    },
    exoType: {
        fontSize: SIZES.small + 2,
        fontFamily: "DMRegular",
        color: COLORS.gray,
        marginTop: 3,
    },
});

export default styles;
