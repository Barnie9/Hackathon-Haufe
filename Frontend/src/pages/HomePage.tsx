import { useState } from "react";
import { EventType } from "../utils/enums.ts";
import SingleSelect from "../components/Select/SingleSelect.tsx";
import Option from "../components/Select/Option.tsx";
import useUser from "../context/UserContext/useUser.tsx";
import Input from "../components/Input.tsx";
import { FaPlusSquare } from "react-icons/fa";
import EventCard from "../components/EventCard.tsx";
import useReactQuery from "../hooks/useReactQuery.tsx";
import Modal from "../components/Modal.tsx";
import { CreateEvent } from "../utils/apiModels.ts";
import Button from "../components/Button.tsx";

const HomePage = () => {
	const { user } = useUser();

	const { events, createEventMutation } = useReactQuery();

	const [eventType, setEventType] = useState<EventType | string>(
		EventType.All,
	);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [createEventModalOpen, setCreateEventModalOpen] =
		useState<boolean>(false);
	const [createEventDto, setCreateEventDto] = useState<CreateEvent>({
		title: "",
		description: "",
		startTime: new Date(),
		endTime: new Date(),
		location: "",
		budget: 0,
		status: "Public",
		organizerUsername: user?.username || "",
		eventTasks: [],
	});

	return (
		<>
			<div
				className={
					"flex h-full w-full flex-col items-center justify-center"
				}
			>
				<div
					className={
						"flex w-full items-center justify-between gap-4 px-4 py-1"
					}
				>
					<Input
						placeholder={"Search"}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholderHidden
						className={"w-80 rounded-lg"}
					/>

					{user ? (
						<SingleSelect
							state={eventType}
							setState={setEventType}
							className={"w-40"}
						>
							<Option value={EventType.All}>All Events</Option>
							<Option value={EventType.Created}>
								Created Events
							</Option>
							<Option value={EventType.Joined}>
								Joined Events
							</Option>
						</SingleSelect>
					) : (
						<div className={"w-40 text-lg font-bold"}>
							All Events
						</div>
					)}
				</div>

				<div className={"flex h-full w-full flex-wrap gap-4 px-8 py-4"}>
					{user && (
						<div
							className={
								"flex h-60 w-60 cursor-pointer items-center justify-center rounded-xl bg-success shadow-2xl"
							}
							onClick={() => setCreateEventModalOpen(true)}
						>
							<FaPlusSquare className={"text-6xl text-white"} />
						</div>
					)}

					{events?.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</div>
			</div>

			<Modal
				title={"Create Event"}
				show={createEventModalOpen}
				setShow={setCreateEventModalOpen}
			>
				<div
					className={"flex w-full items-center justify-center gap-6"}
				>
					<div className={"flex w-1/2 flex-col gap-2"}>
						<Input
							placeholder={"Title"}
							value={createEventDto.title}
							onChange={(e) =>
								setCreateEventDto({
									...createEventDto,
									title: e.target.value,
								})
							}
						/>

						<Input
							placeholder={"Start Time"}
							value={createEventDto.startTime.toISOString()}
							onChange={(e) =>
								setCreateEventDto({
									...createEventDto,
									startTime: new Date(e.target.value),
								})
							}
							date
						/>

						<Input
							placeholder={"Location"}
							value={createEventDto.location}
							onChange={(e) =>
								setCreateEventDto({
									...createEventDto,
									location: e.target.value,
								})
							}
						/>
					</div>
					<div className={"flex w-1/2 flex-col gap-2"}>
						<Input
							placeholder={"Description"}
							value={createEventDto.description}
							onChange={(e) =>
								setCreateEventDto({
									...createEventDto,
									description: e.target.value,
								})
							}
						/>

						<Input
							placeholder={"End Time"}
							value={createEventDto.endTime.toISOString()}
							onChange={(e) =>
								setCreateEventDto({
									...createEventDto,
									endTime: new Date(e.target.value),
								})
							}
							date
						/>

						<Input
							placeholder={"Tasks"}
							value={createEventDto.eventTasks.join(", ")}
							onChange={(e) =>
								setCreateEventDto({
									...createEventDto,
									eventTasks: e.target.value.split(", "),
								})
							}
						/>
					</div>
				</div>
				<div
					className={
						"flex w-full items-center justify-center gap-6 pt-6"
					}
				>
					<Button
						onClick={() => {
							createEventMutation(createEventDto);
							setCreateEventModalOpen(false);
							setCreateEventDto({
								title: "",
								description: "",
								startTime: new Date(),
								endTime: new Date(),
								location: "",
								budget: 0,
								status: "Public",
								organizerUsername: user?.username || "",
								eventTasks: [],
							});
						}}
						className={"w-32"}
					>
						Create
					</Button>
					<Button
						onClick={() => setCreateEventModalOpen(false)}
						className={"w-32"}
					>
						Cancel
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default HomePage;
