import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

export default [
	{ ignores: [".next/**", "node_modules/**"] },
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
		},
		plugins: { "@next/next": nextPlugin },
		rules: {
			"no-console": "warn",
			...nextPlugin.configs.recommended.rules,
		},
	},
	{
		files: ["prisma/**/*.ts"],
		rules: { "no-console": "off" },
	},
];
