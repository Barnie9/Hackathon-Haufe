import ThemeContext from "./ThemeContext.ts";
import { useContext } from "react";

const useTheme = () => {
	return useContext(ThemeContext);
};

export default useTheme;
