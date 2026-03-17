import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    ignores: ['node_modules', 'dist', 'coverage', '**/*.d.ts'],
  },
  {
    files: [
      "packages/**/*.ts",
      "packages/**/*.tsx",
    ],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "ignoreRestSiblings": true,
          "args": "after-used",
          "caughtErrors": "none"
        }
      ],
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];