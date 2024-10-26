import { EventDto, User } from "../utils/apiModels.ts";
import useUser from "../context/UserContext/useUser.tsx";
import Button from "./Button.tsx";
import dayjs from "dayjs";
import Modal from "./Modal.tsx";
import { useState } from "react";

type EventCardProps = {
	event: EventDto;
};

const EventCard = ({ event }: EventCardProps) => {
	const { user } = useUser();

	const [viewEventModalOpen, setViewEventModalOpen] =
		useState<boolean>(false);

	const renderParticipants = (participants: User[]) => {
		for (let i = 0; i < participants.length; i++) {
			if (i === participants.length - 1) {
				return participants[i].username;
			}
			return participants[i].username + ", ";
		}
	};

	const renderDate = (date: Date) => {
		return dayjs(date).format("DD/MM/YYYY HH:mm");
	};

	const renderButton = () => {
		if (user) {
			if (event.organizer.username === user.username) {
				return (
					<Button onClick={() => {}} className={"w-32 p-2"}>
						Edit
					</Button>
				);
			}

			let isParticipant = false;
			event.participants.forEach((participant) => {
				if (participant.username === user.username) {
					isParticipant = true;
				}
			});

			if (isParticipant) {
				return (
					<Button onClick={() => {}} className={"w-32 p-2"}>
						Leave
					</Button>
				);
			} else {
				return (
					<Button onClick={() => {}} className={"w-32 p-2"}>
						Join
					</Button>
				);
			}
		}
	};

	return (
		<>
			<div
				className={
					"flex h-60 w-60 cursor-pointer flex-col items-center gap-1 rounded-xl bg-secondary p-2 shadow-2xl"
				}
				onClick={() => setViewEventModalOpen(true)}
			>
				<span className={"text-2xl font-bold"}>{event.title}</span>

				<span className={"text-gray-500 text-xs"}>
					{renderDate(event.startTime)} - {renderDate(event.endTime)}
				</span>

				<span className={"h-10 w-full text-sm"}>
					{event.description.length > 50
						? `${event.description.slice(0, 50)}...`
						: event.description}
				</span>

				<span className={"h-10 w-full text-sm"}>
					Location:&nbsp;
					{event.location.length > 50
						? `${event.location.slice(0, 50)}...`
						: event.location}
				</span>

				<span className={"h-10 w-full text-sm"}>
					Organizer:&nbsp;
					{event.organizer.username.length > 50
						? `${event.organizer.username.slice(0, 50)}...`
						: event.organizer.username}
				</span>

				{renderButton()}
			</div>

			<Modal
				title={event.title}
				show={viewEventModalOpen}
				setShow={setViewEventModalOpen}
			>
				<div
					className={"flex w-full items-center justify-center gap-6"}
				>
					<div className={"flex w-1/2 flex-col items-center gap-2"}>
						<span className={"flex flex-col"}>
							<span className={"text-center text-lg font-bold"}>
								Time
							</span>
							{renderDate(event.startTime) +
								" - " +
								renderDate(event.endTime)}
						</span>

						<span className={"flex h-14 w-full flex-col"}>
							<span className={"text-center text-lg font-bold"}>
								Description
							</span>
							{event.description.length > 50
								? `${event.description.slice(0, 50)}...`
								: event.description}
						</span>

						<span className={"flex h-14 w-full flex-col"}>
							<span className={"text-center text-lg font-bold"}>
								Location
							</span>
							{event.location.length > 50
								? `${event.location.slice(0, 50)}...`
								: event.location}
						</span>

						<span className={"flex h-14 w-full flex-col"}>
							<span className={"text-center text-lg font-bold"}>
								Organizer
							</span>
							{event.organizer.username.length > 50
								? `${event.organizer.username.slice(0, 50)}...`
								: event.organizer.username}
						</span>

						<span className={"flex h-14 w-full flex-col"}>
							<span className={"text-center text-lg font-bold"}>
								Participants
							</span>
							{event.participants.length === 0
								? "None"
								: renderParticipants(event.participants)}
						</span>
					</div>
					<div
						className={
							"flex max-h-[40vh] w-1/2 flex-col gap-2 overflow-y-auto"
						}
					>
						{event.eventTasks.map((task) => (
							<div
								className={
									"flex flex-col gap-2 rounded-xl bg-secondary p-2"
								}
							>
								<span className={"text-lg font-bold"}>
									{task.title}
								</span>
								<span className={"text-sm"}>
									Assignees:&nbsp;
									{task.assignees.length === 0
										? "None"
										: task.assignees.map((assignee) => (
												<span>{assignee.username}</span>
											))}
								</span>
							</div>
						))}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default EventCard;
