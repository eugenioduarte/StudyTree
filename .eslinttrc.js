module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-native", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    "react-native/react-native": true,
  },
};
