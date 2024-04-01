import axios, { Method } from "axios";
import { useEffect, useState } from "react";

export const API_URL = "https://bpump-api.vercel.app"; // WARNING : do not put any "/" at the end of this url

export default function useFetch(method: Method, endpoint: string, body: any = {}) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const options = {
        method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data);
        } catch (error) {
            console.log("Error while fetching API :", endpoint, error);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, error, refetch };
}
