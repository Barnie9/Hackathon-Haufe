/** @type {import("tailwindcss").Config} */

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	safelist: [
		{
			pattern:
				/(bg|text|border)-(primary|secondary|accent|background|text|success|warning|error|black|gray|light_gray|white)/,
			variants: [
				"hover",
				"focus",
				"active",
				"sm",
				"md",
				"lg",
				"xl",
				"2xl",
			],
		},
	],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				accent: "var(--color-accent)",
				background: "var(--color-background)",
				text: "var(--color-text)",

				success: "var(--color-success)",
				warning: "var(--color-warning)",
				error: "var(--color-error)",

				black: "var(--color-black)",
				gray: "var(--color-gray)",
				light_gray: "var(--color-light_gray)",
				white: "var(--color-white)",
			},
		},
	},
	plugins: [],
};
