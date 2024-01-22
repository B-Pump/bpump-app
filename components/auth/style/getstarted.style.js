import { StyleSheet } from "react-native"
import { COLORS } from "../../../constants"

const styles = StyleSheet.create({
    startImg: (rotation) => ({
        height: 100,
        width: 100,
        backgroundColor: COLORS.tertiary,
        borderRadius: 20,
        transform: [{ rotate: rotation }],
    }),
    startTitle: {
        fontSize: 36,
        fontWeight: "700",
    },
    startDesc: {
        fontSize: 14,
    },
    startBtnContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    startBtn: {
        marginTop: 22,
        width: "100%",
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.tertiary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.tertiary,
    },
    startAccount: {
        fontSize: 14,
        textDecorationLine: "underline",
        color: COLORS.gray,
    },
})

export default styles
