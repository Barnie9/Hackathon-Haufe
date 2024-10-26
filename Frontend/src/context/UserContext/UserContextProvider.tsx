import { ReactNode, useState } from "react";
import UserContext from "./UserContext.ts";
import { LoginCredentials, User } from "../../utils/apiModels.ts";
import useAuthController from "../../api/useAuthController.tsx";
import useUserController from "../../api/useUserController.tsx";

const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const { login: loginApi } = useAuthController();
	const { getUserByRefreshToken } = useUserController();

	const [user, setUser] = useState<User | undefined>(undefined);

	const login = async (loginCredentials: LoginCredentials) => {
		const response = await loginApi(loginCredentials);

		if (response) {
			const user = await getUserByRefreshToken(response.refreshToken);
			setUser(user);
			return true;
		}

		return false;
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");

		setUser(undefined);
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
