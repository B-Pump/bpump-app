import { StyleSheet } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    headerContainer: {
        marginVertical: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    headerLogoBox: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: SIZES.large,
    },
    headerLogoImage: {
        width: "80%",
        height: "80%",
    },
    headerTitleBox: {
        marginTop: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.large,
        color: COLORS.light.text,
        fontFamily: FONT.bold,
        textAlign: "center",
    },
    headerCategoryBox: {
        marginTop: SIZES.small / 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    headerCategory: {
        fontSize: SIZES.medium - 2,
        color: COLORS.light.text,
        fontFamily: FONT.medium,
    },
    categoryDifficultyBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryDifficultyImg: {
        width: 14,
        height: 14,
        tintColor: COLORS.gray,
    },
    categoryDifficulty: {
        fontSize: SIZES.medium - 2,
        color: COLORS.gray,
        fontFamily: FONT.regular,
        marginLeft: 2,
    },
    tabsContainer: {
        marginTop: SIZES.small,
        marginBottom: SIZES.small / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    tabsBtn: (name, activeTab) => ({
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.xLarge,
        backgroundColor: name === activeTab ? COLORS.primary : COLORS.white,
        borderRadius: SIZES.medium,
        marginLeft: 2,
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    }),
    tabsBtnText: (name, activeTab) => ({
        fontFamily: "DMMedium",
        fontSize: SIZES.small,
        color: name === activeTab ? COLORS.light.background : COLORS.gray2,
    }),
    caseContainer: {
        marginTop: SIZES.large,
        backgroundColor: "#FFF",
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
    },
    caseTitle: {
        fontSize: SIZES.large,
        color: COLORS.light.text,
        fontFamily: FONT.bold,
    },
    caseDescBox: {
        marginVertical: SIZES.small,
    },
    caseDesc: {
        fontSize: SIZES.medium - 2,
        color: COLORS.gray,
        fontFamily: FONT.regular,
        marginVertical: SIZES.small / 1.25,
    },
});

export default styles;
