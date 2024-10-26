import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";

const useTestController = () => {
	const basePath = "/Test";
	const axiosPrivate = useAxiosPrivate();

	const adminTest = async () => {
		const response = await axiosPrivate.get(`${basePath}/admin-test`);

		console.log(response.data);

		return response.data;
	};

	const userTest = async () => {
		const response = await axiosPrivate.get(`${basePath}/user-test`);

		console.log(response.data);

		return response.data;
	};

	const authTest = async () => {
		const response = await axiosPrivate.get(`${basePath}/auth-test`);

		console.log(response.data);

		return response.data;
	};

	const noAuthTest = async () => {
		const response = await axiosPrivate.get(`${basePath}/no-auth-test`);

		console.log(response.data);

		return response.data;
	};

	return {
		adminTest,
		userTest,
		authTest,
		noAuthTest,
	};
};

export default useTestController;
