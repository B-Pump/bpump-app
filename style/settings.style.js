import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    title: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.quaternary,
    },
    desc: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.quaternary,
        marginTop: 2,
    },
});

export default styles;
