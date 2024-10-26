import Input from "../components/Input.tsx";
import useAuthController from "../api/useAuthController.tsx";
import { useState } from "react";
import {
	CredentialValidationErrors,
	RegisterCredentials,
} from "../utils/apiModels.ts";
import Button from "../components/Button.tsx";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const navigate = useNavigate();

	const { verifyRegisterCredentials, register } = useAuthController();

	const [registerCredentials, setRegisterCredentials] =
		useState<RegisterCredentials>({
			username: "",
			email: "",
			firstName: "",
			lastName: "",
			password: "",
			confirmPassword: "",
		});
	const [credentialValidationErrors, setCredentialValidationErrors] =
		useState<CredentialValidationErrors>();

	const onBlur = async () => {
		setCredentialValidationErrors(
			await verifyRegisterCredentials(registerCredentials),
		);
	};

	const onRegisterClick = async () => {
		const response = await register(registerCredentials);

		if (response) {
			navigate("/");

			setRegisterCredentials({
				username: "",
				email: "",
				firstName: "",
				lastName: "",
				password: "",
				confirmPassword: "",
			});

			return;
		}

		alert("Failed to register");
	};

	return (
		<div
			className={
				"flex h-screen w-full flex-col items-center justify-center overflow-y-auto"
			}
		>
			<div
				className={
					"flex w-10/12 flex-col items-center gap-2 rounded-xl p-3 lg:w-5/12"
				}
			>
				<div className={"text-3xl font-bold"}>Signup</div>

				<Input
					placeholder={"Username"}
					value={registerCredentials.username}
					onChange={(e) => {
						setRegisterCredentials({
							...registerCredentials,
							username: e.target.value,
						});
					}}
					onBlur={onBlur}
					error={credentialValidationErrors?.username}
				/>

				<Input
					placeholder={"Email"}
					value={registerCredentials.email}
					onChange={(e) => {
						setRegisterCredentials({
							...registerCredentials,
							email: e.target.value,
						});
					}}
					onBlur={onBlur}
					error={credentialValidationErrors?.email}
				/>

				<Input
					placeholder={"First Name"}
					value={registerCredentials.firstName}
					onChange={(e) => {
						setRegisterCredentials({
							...registerCredentials,
							firstName: e.target.value,
						});
					}}
					onBlur={onBlur}
					optional
				/>

				<Input
					placeholder={"Last Name"}
					value={registerCredentials.lastName}
					onChange={(e) => {
						setRegisterCredentials({
							...registerCredentials,
							lastName: e.target.value,
						});
					}}
					onBlur={onBlur}
					optional
				/>

				<Input
					placeholder={"Password"}
					value={registerCredentials.password}
					onChange={(e) => {
						setRegisterCredentials({
							...registerCredentials,
							password: e.target.value,
						});
					}}
					onBlur={onBlur}
					error={credentialValidationErrors?.password}
					password
				/>

				<Input
					placeholder={"Confirm Password"}
					value={registerCredentials.confirmPassword}
					onChange={(e) => {
						setRegisterCredentials({
							...registerCredentials,
							confirmPassword: e.target.value,
						});
					}}
					onBlur={onBlur}
					error={credentialValidationErrors?.confirmPassword}
					password
				/>

				<Button onClick={onRegisterClick}>Register</Button>
			</div>
		</div>
	);
};

export default RegisterPage;
