import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    searchTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.light.text,
    },
    noOfSearchedExos: {
        marginTop: 2,
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.light.text,
    },
    loaderContainer: {
        marginTop: SIZES.medium,
    },
    footerContainer: {
        marginTop: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
    paginationButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },
    paginationImage: {
        width: "60%",
        height: "60%",
        tintColor: COLORS.white,
    },
    paginationTextBox: {
        width: 30,
        height: 30,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
    },
    paginationText: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.light.text,
    },
});

export default styles;
