import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Disable this rule - our useScrollReveal hook returns isRevealed as state,
      // not a ref value, but ESLint incorrectly flags it because it's in the same object as ref
      "react-hooks/refs": "off",
    },
  },
]);

export default eslintConfig;

