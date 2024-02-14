import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: SIZES.small,
        backgroundColor: "#FFF",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    startExoBtn: {
        flex: 1,
        backgroundColor: COLORS.primary,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: SIZES.medium,
        borderRadius: SIZES.medium,
    },
    startExoText: {
        fontSize: SIZES.medium,
        color: COLORS.light.background,
        fontFamily: FONT.bold,
        padding: SIZES.medium,
    },
});

export default styles;
