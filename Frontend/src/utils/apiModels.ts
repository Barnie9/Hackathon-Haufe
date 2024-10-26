export type RegisterCredentials = {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type LoginCredentials = {
	username?: string;
	email?: string;
	password: string;
};

export type AuthResponse = {
	token: string;
	refreshToken: string;
};

export type CredentialValidationErrors = {
	username?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
};

export type User = {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
};

export type EventTask = {
	title: string;
	isCompleted: boolean;
	cost?: number;
	assignees: User[];
};

export type CreateEvent = {
	title: string;
	description: string;
	startTime: Date;
	endTime: Date;
	location: string;
	budget: number;
	status: string;
	organizerUsername: string;
	eventTasks: string[];
};

export type EventDto = {
	id: string;
	title: string;
	description: string;
	startTime: Date;
	endTime: Date;
	location: string;
	status: string;
	organizer: User;
	participants: User[];
	eventTasks: EventTask[];
};
