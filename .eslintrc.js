module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["tailwindcss"],
  extends: [
    "next/core-web-vitals",
    "prettier",
    "eslint:recommended",
    "plugin:tailwindcss/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    removeDuplicates: true,
    whitelist: [],
  },
};
