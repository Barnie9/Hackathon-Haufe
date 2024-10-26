import { QueryClient, useMutation, useQuery } from "react-query";
import useEventController from "../api/useEventController.tsx";

const useReactQuery = () => {
	const queryClient = new QueryClient();

	const { getAllEvents, createEvent } = useEventController();

	const {
		data: events,
		isLoading: isEventsLoading,
		isError: isEventsError,
	} = useQuery("events", getAllEvents);

	const { data: createdEvent, mutate: createEventMutation } = useMutation(
		createEvent,
		{
			onSuccess: () => {
				queryClient.invalidateQueries("events");
			},
		},
	);

	return {
		events,
		isEventsLoading,
		isEventsError,
		createdEvent,
		createEventMutation,
	};
};

export default useReactQuery;
