module.exports = {
    root: true,
    extends: ["plugin:tailwindcss/recommended"],
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            parser: "@typescript-eslint/parser",
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    env: {
        es6: true,
    },
};
