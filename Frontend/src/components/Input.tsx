import { ChangeEvent } from "react";
import { Style } from "../utils/types.ts";
import { createStyle } from "../utils/functions.ts";

type Props = {
	placeholder: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
	error?: string;
	placeholderHidden?: boolean;
	date?: boolean;
	password?: boolean;
	optional?: boolean;
	style?: Style;
	className?: string;
};

const Input = ({
	placeholder,
	value,
	onChange,
	onBlur,
	error,
	placeholderHidden,
	date,
	password,
	optional,
	style,
	className,
}: Props) => {
	style = createStyle(style);

	return (
		<div
			className={`flex w-full flex-col gap-0.5 px-4 py-2 text-${style.textColor}`}
		>
			<div className={"font-bold"}>
				{!placeholderHidden && placeholder}

				{optional && (
					<span className={"text-sm text-gray"}> (optional)</span>
				)}
			</div>

			<input
				placeholder={placeholderHidden ? placeholder : ""}
				value={value}
				type={`${password ? "password" : date ? "date" : "text"}`}
				onChange={onChange}
				onBlur={onBlur}
				className={`bg-${style.backgroundColor} border-2 border-accent p-1 transition-colors duration-500 focus:outline-none ${!error ? `border-${style.borderColor}` : "border-error"} ${className}`}
			/>

			{error && (
				<div className={"w-full bg-[#fbb4af] p-1 text-error"}>
					{error}
				</div>
			)}
		</div>
	);
};

export default Input;
