import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import react from "eslint-plugin-react";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 브라우저 환경 변수(window 등) 허용
      },
    },
    plugins: {
      react, // 리액트 관련 규칙 추가
    },
    settings: {
      react: { version: "detect" }, // 리액트 버전 자동 감지
    },
  },
  {
    ignores: ["dist", "node_modules"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // 추가: any 사용을 에러가 아닌 '경고'로만 표시 (고도화하면서 천천히 고치기 위해)
      "@typescript-eslint/no-explicit-any": "warn",

      // 추가: 빈 블록({}) 허용
      "no-empty": "warn",
    },
  },
  prettierConfig,
];
