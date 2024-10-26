import Input from "../components/Input.tsx";
import { useState } from "react";
import { LoginCredentials } from "../utils/apiModels.ts";
import Button from "../components/Button.tsx";
import useUser from "../context/UserContext/useUser.tsx";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const navigate = useNavigate();
	const { login } = useUser();

	const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
		username: "",
		password: "",
	});

	const onLoginClick = async () => {
		const response = await login(loginCredentials);

		if (response) {
			setLoginCredentials({
				username: "",
				password: "",
			});

			navigate("/");

			return;
		}

		alert("Invalid login credentials");
	};

	return (
		<div
			className={
				"flex h-screen w-full flex-col items-center justify-center"
			}
		>
			<div
				className={
					"flex w-10/12 flex-col items-center gap-2 rounded-xl p-5 lg:w-5/12"
				}
			>
				<div className={"text-3xl font-bold"}>Login</div>

				<Input
					placeholder={"Username"}
					value={loginCredentials.username!}
					onChange={(e) => {
						setLoginCredentials({
							...loginCredentials,
							username: e.target.value,
						});
					}}
				/>

				<Input
					placeholder={"Password"}
					value={loginCredentials.password}
					onChange={(e) => {
						setLoginCredentials({
							...loginCredentials,
							password: e.target.value,
						});
					}}
					password
				/>

				<Button onClick={onLoginClick}>Login</Button>
			</div>
		</div>
	);
};

export default RegisterPage;
