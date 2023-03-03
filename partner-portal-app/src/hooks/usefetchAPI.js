import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFetchAPI = (url) => {
	const { data, isLoading, error } = useSWR(url, fetcher);
	return {
		data,
		isLoading,
		error,
	};
};

export default useFetchAPI;
