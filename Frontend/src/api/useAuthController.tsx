import useAxiosPublic from "../hooks/useAxiosPublic.tsx";
import {
	AuthResponse,
	CredentialValidationErrors,
	LoginCredentials,
	RegisterCredentials,
} from "../utils/apiModels.ts";

const useAuthController = () => {
	const basePath = "/Auth";
	const axiosPublic = useAxiosPublic();

	const verifyRegisterCredentials = async (
		registerCredentials: RegisterCredentials,
	) => {
		const response = await axiosPublic.post(
			`${basePath}/verify-register-credentials`,
			registerCredentials,
		);

		return response.data as CredentialValidationErrors;
	};

	const register = async (registerCredentials: RegisterCredentials) => {
		try {
			const response = await axiosPublic.post(
				`${basePath}/register`,
				registerCredentials,
			);

			localStorage.setItem("token", response.data.token);
			localStorage.setItem("refreshToken", response.data.refreshToken);

			return response.data as AuthResponse;
		} catch (error) {
			console.log(error);

			return null;
		}
	};

	const login = async (loginCredentials: LoginCredentials) => {
		try {
			const response = await axiosPublic.post(
				`${basePath}/login`,
				loginCredentials,
			);

			localStorage.setItem("token", response.data.token);
			localStorage.setItem("refreshToken", response.data.refreshToken);

			return response.data as AuthResponse;
		} catch (error) {
			console.log(error);

			return null;
		}
	};

	const refreshToken = async () => {
		const response = await axiosPublic.post(`${basePath}/refresh-token`, {
			refreshToken: localStorage.getItem("refreshToken"),
		});

		localStorage.setItem("token", response.data.token);
		localStorage.setItem("refreshToken", response.data.refreshToken);

		return response.data as AuthResponse;
	};

	return {
		verifyRegisterCredentials,
		register,
		login,
		refreshToken,
	};
};

export default useAuthController;
