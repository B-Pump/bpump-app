import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    aboutTitle: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.quaternary,
    },
    aboutDesc: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.quaternary,
        marginTop: 2,
    },
    aboutContainer: {
        marginTop: SIZES.large,
    },
    aboutText: {
        paddingVertical: SIZES.small - 5,
    },
});

export default styles;
