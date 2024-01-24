import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        width: 250,
        padding: SIZES.xLarge,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "space-between",
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
    progCategory: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
        marginTop: SIZES.small / 1.5,
    },
    infoContainer: {
        marginTop: SIZES.large,
    },
    progTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.secondary,
    },
    infoWrapper: {
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    publisher: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: COLORS.secondary,
    },
    infosup: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONT.regular,
        color: "#B3AEC6",
    },
});

export default styles;
