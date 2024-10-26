import { createContext } from "react";
import { LoginCredentials, User } from "../../utils/apiModels.ts";

type UserContextType = {
	user?: User;
	login: (loginCredentials: LoginCredentials) => Promise<boolean>;
	logout: () => void;
};

const UserContext = createContext<UserContextType>({
	login: async () => false,
	logout: () => {},
});

export default UserContext;
