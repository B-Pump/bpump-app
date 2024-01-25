const COLORS = {
    light: {
        background: "#FFFFFF",
        text: "#000000",
    },
    dark: {
        background: "#003366",
        text: "#FAFAFC",
    },

    primary: "#7AA95B",
    secondary: "#A7C691",
    tertiary: "#C8D5BE",
    quaternary: "#1C1D22",
    quinary: "#26262E",
    senary: "#FF7C44",

    gray: "#83829A",
    gray2: "#C1C0C8",

    white: "#FAFAFC",
    red: "#FF0000",
    blue: "#0040FF",
};

const FONT = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
};

const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};

export { COLORS, FONT, SIZES, SHADOWS };
