import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        Buffer: 'readonly' 
      }
    },
    plugins: {
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
    ],
  }
];
