import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    title: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.light.text,
    },
    desc: {
        marginTop: 2,
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.light.text,
    },
});

export default styles;
