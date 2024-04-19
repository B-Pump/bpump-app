import axios, { Method } from "axios";
import { useEffect, useState } from "react";

export const API_URL = "https://bpump-api.vercel.app"; // WARNING : do not put any "/" at the end of this url

interface FetchProps {
    data: any;
    isLoading: boolean;
    error: boolean;
    refetch: () => Promise<void>;
}

/**
 * Custom API Hook
 * @author wiizz
 * @param {Method} method {@link Method Method}
 * @param {string} endpoint
 * @param {any} body
 * @returns {FetchProps}
 * @see https://github.com/B-Pump/bpump-api
 */
export function useFetch(method: Method, endpoint: string, body: any = {}): FetchProps {
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
            console.warn("Error while fetching API :", endpoint, error);
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
