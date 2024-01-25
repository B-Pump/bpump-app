import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    settingsTitle: {
        fontFamily: FONT.regular,
        fontSize: SIZES.large,
        color: COLORS.quaternary,
    },
    settingsDesc: {
        fontFamily: FONT.bold,
        fontSize: SIZES.xLarge,
        color: COLORS.quaternary,
        marginTop: 2,
    },
    settingsContainer: {
        paddingVertical: 20,
    },
    settingsContainerTitle: {
        fontSize: SIZES.small,
        marginBottom: 8,
        marginLeft: 10,
    },
    settingsContent: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray2,
    },
    objectContainer: (border, flex) => ({
        flexDirection: flex ? "row" : null,
        borderTopWidth: border ? 1 : 0,
        borderTopColor: COLORS.gray2,
        padding: 12,
    }),
    themeImg: {
        width: 18,
        height: 18,
        borderRadius: SIZES.small / 1.25,
        marginRight: 8,
        tintColor: COLORS.quinary,
    },
    deviceInfo: {
        justifyContent: "space-between",
    },
    accountButton: {},
    accountBtnTxt: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: COLORS.red,
        color: COLORS.red,
        fontWeight: "bold",
        backgroundColor: "#ff000033",
        marginTop: 15,
        marginLeft: "20%",
        marginRight: "20%",
        padding: 8,
    },
});

export default styles;
