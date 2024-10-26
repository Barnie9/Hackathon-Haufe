import { MdDarkMode, MdLightMode } from "react-icons/md";
import useTheme from "../context/ThemeContext/useTheme.tsx";
import Button from "../components/Button.tsx";
import { useState } from "react";
import SingleSelect from "../components/Select/SingleSelect.tsx";
import Option from "../components/Select/Option.tsx";
import MultipleSelect from "../components/Select/MultipleSelect.tsx";
import useTestController from "../api/useTestController.tsx";
import Input from "../components/Input.tsx";

const TestPage = () => {
	const { theme, toggleTheme } = useTheme();

	const [singleOption, setSingleOption] = useState<string>("");
	const [multipleOptions, setMultipleOptions] = useState<string[]>([]);

	const { adminTest, userTest, authTest, noAuthTest } = useTestController();

	return (
		<div
			className={
				"flex h-screen w-full flex-col items-center justify-center gap-5"
			}
		>
			<Button onClick={() => toggleTheme()}>
				{theme == "light" ? <MdLightMode /> : <MdDarkMode />}
			</Button>

			<Button
				onClick={() => console.log("Hello, World!")}
				disabled={true}
			>
				Hello, World!
			</Button>

			{/*<SingleSelect*/}
			{/*	state={singleOption}*/}
			{/*	setState={setSingleOption}*/}
			{/*	placeholder={"Test 1"}*/}
			{/*>*/}
			{/*	<Option value={"option1"}>Optiune 1</Option>*/}
			{/*	<Option value={"option2"}>Optiune 2</Option>*/}
			{/*</SingleSelect>*/}

			{/*<MultipleSelect*/}
			{/*	state={multipleOptions}*/}
			{/*	setState={setMultipleOptions}*/}
			{/*	placeholder={"Test 2"}*/}
			{/*	className={"w-40"}*/}
			{/*>*/}
			{/*	<Option value={"option1"}>Optiune 1</Option>*/}
			{/*	<Option value={"option2"}>Optiune 2</Option>*/}
			{/*	<Option value={"option3"}>Optiune 3</Option>*/}
			{/*</MultipleSelect>*/}

			{/*<Button onClick={adminTest}>Admin Test</Button>*/}
			{/*<Button onClick={userTest}>User Test</Button>*/}
			{/*<Button onClick={authTest}>Auth Test</Button>*/}
			{/*<Button onClick={noAuthTest}>No Auth Test</Button>*/}

			<Input
				placeholder={"Test"}
				value={singleOption}
				onChange={(e) => setSingleOption(e.target.value)}
				error={"Error"}
			/>
		</div>
	);
};

export default TestPage;
