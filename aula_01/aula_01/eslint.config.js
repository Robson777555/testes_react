import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser ?? {}, // Usa um fallback vazio caso não esteja definido
        ...globals.node ?? {},
        ...globals.jest ?? {}, // Adicione isso apenas se usar Jest
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // Adicione a configuração da versão do React aqui
    settings: {
      react: {
        version: "18.3.1", // Detecta automaticamente a versão do React
      },
    },
  },
];
