import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // 👈 говорит ESLint, что React 17+
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // 👈 отключаем устаревшее правило
    },
  },
]);