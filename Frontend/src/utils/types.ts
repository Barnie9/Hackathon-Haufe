import { ColorVariant } from "./enums.ts";

export type Style = {
	backgroundColor?: ColorVariant | string;
	borderColor?: ColorVariant | string;
	textColor?: ColorVariant | string;

	hoverBackgroundColor?: ColorVariant | string;

	border?: boolean;
};
