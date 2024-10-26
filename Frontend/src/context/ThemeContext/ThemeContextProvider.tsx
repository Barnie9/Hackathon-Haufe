import { ReactNode, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext.ts";

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<string>("light");

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		if (localTheme) {
			setTheme(localTheme);
		}
	}, []);

	useEffect(() => {
		document.documentElement.className = `${theme}`;
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
