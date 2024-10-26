import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import { CreateEvent, EventDto } from "../utils/apiModels.ts";

const useEventController = () => {
	const basePath = "/Event";
	const axiosPrivate = useAxiosPrivate();

	const createEvent = async (event: CreateEvent) => {
		try {
			await axiosPrivate.post(basePath, event);

			return true;
		} catch (error) {
			return false;
		}
	};

	const getAllEvents = async () => {
		const response = await axiosPrivate.get(basePath);
		return response.data as EventDto[];
	};

	return {
		createEvent,
		getAllEvents,
	};
};

export default useEventController;
