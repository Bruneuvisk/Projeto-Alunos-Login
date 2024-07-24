import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact, { rules } from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {extends: [
   'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  plugins: [
    'react',
    'prettier',
    'react-hooks',
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 0,
    'import/prefere-default-export': 0,
    'react-hooks/rules-of-hooks': "error",
    'react-hooks/exhaustive-deps': "warn",
  }
  }
];