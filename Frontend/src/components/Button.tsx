import { Style } from "../utils/types.ts";
import { ReactNode } from "react";
import { createStyle } from "../utils/functions.ts";

type ButtonProps = {
	children: ReactNode;
	onClick: () => void;
	disabled?: boolean;
	style?: Style;
	className?: string;
};

const Button = (props: ButtonProps) => {
	const { children, onClick, disabled = false, className = "" } = props;
	const style = createStyle(props.style);

	return (
		<div
			className={`flex items-center justify-center gap-3 rounded-xl p-3 transition-all duration-500 bg-${style.backgroundColor} text-${style.textColor} ${style.border && `border-2 border-${style.borderColor}`} ${!disabled ? `hover:cursor-pointer hover:bg-${style.borderColor} hover:text-${style.backgroundColor}` : "opacity-20 hover:cursor-not-allowed"} ${className}`}
			onClick={() => !disabled && onClick()}
		>
			{children}
		</div>
	);
};

export default Button;
