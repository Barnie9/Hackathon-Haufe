import { Style } from "./types.ts";
import { DefaultStyle } from "./constants.ts";

export const createStyle = (style: Style | undefined) => {
	return {
		...DefaultStyle,
		...style,
	} as Style;
};
