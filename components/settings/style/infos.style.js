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
        flexDirection: "row",
        borderTopWidth: border ? 1 : 0,
        borderTopColor: COLORS.gray2,
        padding: 12,
    }),
    info: {
        justifyContent: "space-between",
    },
});

export default styles;
