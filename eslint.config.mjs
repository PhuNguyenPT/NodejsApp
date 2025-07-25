// eslint.config.mjs
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import vitest from "@vitest/eslint-plugin";

export default tseslint.config(
  {
    // 👇 Add the config file to the ignores list here
    ignores: [
      "**/*.js",
      "dist/**/*",
      "**/generated/",
      "eslint.config.mjs",
      "**/migration/",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  perfectionist.configs["recommended-natural"],
  {
    files: ["**/*.test.ts", "**/*.spec.ts"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
);
