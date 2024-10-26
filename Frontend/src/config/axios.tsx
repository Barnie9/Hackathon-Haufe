import axios from "axios";

// @ts-expect-error VITE_BACKEND_URL is defined in .env
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosPublic = axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});
