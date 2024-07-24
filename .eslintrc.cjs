module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "react-refresh", "prettier"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                semi: true,
                singleQuote: true,
                tabWidth: 2,
                useTabs: false,
            },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        semi: ["error", "always"],
        indent: ["error", 2],
        quotes: ["error", "single"],
        "comma-dangle": ["error", "always-multiline"],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
