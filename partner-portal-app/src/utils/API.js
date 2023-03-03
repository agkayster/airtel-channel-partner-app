import axios from 'axios';
const endpoint = process.env.REACT_APP_BACKEND_ROUTE;

export const axiosInstance = axios.create({
	baseURL: endpoint,
});
