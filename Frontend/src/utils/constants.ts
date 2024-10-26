import { Style } from "./types.ts";
import { ColorVariant } from "./enums.ts";

export const DefaultStyle: Style = {
	backgroundColor: ColorVariant.background,
	borderColor: ColorVariant.text,
	textColor: ColorVariant.text,

	hoverBackgroundColor: ColorVariant.light_gray,

	border: true,
};
