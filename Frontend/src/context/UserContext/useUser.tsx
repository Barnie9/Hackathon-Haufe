import { useContext } from "react";
import UserContext from "./UserContext.ts";

const useUser = () => {
	return useContext(UserContext);
};

export default useUser;
