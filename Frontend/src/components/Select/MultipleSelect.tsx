import { cloneElement, createRef, ReactElement, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside.tsx";
import { Style } from "../../utils/types.ts";
import { createStyle } from "../../utils/functions.ts";
import { FaCaretDown, FaCaretUp, FaCheck } from "react-icons/fa";

type MultipleSelectProps = {
	children: ReactElement[];
	state: string[];
	setState: (value: string[]) => void;
	placeholder: string;
	disabled?: boolean;
	style?: Style;
	className?: string;
};

const MultipleSelect = (props: MultipleSelectProps) => {
	const {
		children,
		state,
		setState,
		placeholder,
		disabled = false,
		className = "",
	} = props;
	const style = createStyle(props.style);

	const [open, setOpen] = useState<boolean>(false);

	const ref = createRef<HTMLDivElement>();
	useClickOutside(ref, () => setOpen(false));

	const handleOptionClick = (value: string) => {
		if (state.includes(value)) {
			const newValues = state.filter((val) => val !== value);
			setState(newValues);
		} else {
			setState([...state, value]);
		}
	};

	return (
		<div ref={ref} className={"relative"}>
			<div
				className={`flex items-center justify-between gap-3 ${!open ? `rounded-xl` : `rounded-t-xl`} p-3 transition-colors duration-500 bg-${style.backgroundColor} text-${style.textColor} ${style.border && `border-2 border-${style.borderColor}`} ${!disabled ? `hover:cursor-pointer hover:bg-${style.hoverBackgroundColor}` : "opacity-20 hover:cursor-not-allowed"} ${className}`}
				onClick={() => !disabled && setOpen(!open)}
			>
				{placeholder}
				{open ? <FaCaretUp /> : <FaCaretDown />}
			</div>

			{open && (
				<div
					className={`absolute top-full z-20 flex w-full flex-col rounded-b-xl p-1 bg-${style.backgroundColor} ${style.border && `border-2 border-${style.borderColor}`}`}
				>
					{children.map((child, index) => {
						return cloneElement(child, {
							key: index,
							onClick: handleOptionClick,
							children: state.includes(child.props.value)
								? [child.props.children, <FaCheck />]
								: child.props.children,
							selected: state.includes(child.props.value),
						});
					})}
				</div>
			)}
		</div>
	);
};

export default MultipleSelect;
