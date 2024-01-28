import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    overlayContainer: {
        flex: 1,
    },
    frame: (h, w, f) => ({
        position: "absolute",
        borderColor: COLORS.white,
        borderWidth: 4,
        borderRadius: 20,
        width: f,
        height: f,
        top: (h - f) / 2,
        left: (w - f) / 2,
    }),
    overlayText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: FONT.regular,
        textAlign: "center",
        marginTop: 10,
        backgroundColor: "#00000094",
        borderRadius: 20,
        padding: 5,
        marginHorizontal: 40,
        marginTop: "50%",
    },
    permissonProblem: {
        paddingVertical: "80%",
        paddingHorizontal: 110,
    },
});

export default styles;
