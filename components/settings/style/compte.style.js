import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    title: {
        fontSize: SIZES.small,
        marginBottom: 8,
        marginLeft: 10,
    },
    content: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray2,
    },
    object: (border) => ({
        borderTopWidth: border ? 1 : 0,
        borderTopColor: COLORS.gray2,
        padding: 12,
    }),
    button: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray2,
        borderRadius: 6,
        borderWidth: 1,
        paddingVertical: 6,
        marginVertical: 10,
        alignItems: "center",
    },
    buttonText: {
        color: COLORS.light.text,
        fontSize: 14,
        fontWeight: "500",
    },
});

export default styles;
