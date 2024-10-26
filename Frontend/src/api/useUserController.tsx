import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import { User } from "../utils/apiModels.ts";

const useUserController = () => {
	const basePath = "/User";
	const axiosPrivate = useAxiosPrivate();

	const getUserByRefreshToken = async (refreshToken: string) => {
		try {
			const response = await axiosPrivate.get(
				`${basePath}/refresh-token/${refreshToken}`,
			);

			return response.data as User;
		} catch (error) {
			console.log(error);
		}
	};

	return {
		getUserByRefreshToken,
	};
};

export default useUserController;
