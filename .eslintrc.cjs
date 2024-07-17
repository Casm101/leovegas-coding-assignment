module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended", // Adding react recommended settings
        "plugin:prettier/recommended", // Integrating Prettier
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
        "react/jsx-uses-react": "off", // Not needed with the new JSX transform
        "react/react-in-jsx-scope": "off", // Not needed with the new JSX transform
        semi: ["error", "always"], // Ensure semicolons are used
        indent: ["error", 2], // Use 2 spaces for indentation
        quotes: ["error", "single"], // Single quotes for strings
        "comma-dangle": ["error", "always-multiline"], // Ensure consistent use of trailing commas
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
