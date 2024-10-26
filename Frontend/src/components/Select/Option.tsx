import { ReactNode } from "react";

type OptionProps = {
	value: string;
	children: ReactNode;
	onClick?: (value: string) => void;
	selected?: boolean;
};

const Option = (props: OptionProps) => {
	const { value, children, onClick, selected = false } = props;

	return (
		<div
			className={`flex items-center justify-between gap-3 p-3 hover:cursor-pointer hover:bg-light_gray ${selected && "bg-light_gray"} last:rounded-b-xl`}
			onClick={() => onClick && onClick(value)}
		>
			{children}
		</div>
	);
};

export default Option;
