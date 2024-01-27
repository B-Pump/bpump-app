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
    theme: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    img: {
        width: 18,
        height: 18,
        borderRadius: SIZES.small / 1.25,
        marginRight: 8,
        tintColor: COLORS.gray,
    },
    circle: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.gray,
        width: 15,
        height: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    selection: (active) => ({
        borderRadius: 20,
        width: 10,
        height: 10,
        backgroundColor: active ? COLORS.gray : "transparent",
    }),
});

export default styles;
