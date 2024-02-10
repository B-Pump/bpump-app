import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(method, endpoint, query) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: method,
        url: `https://r77s73sc-3000.uks1.devtunnels.ms/${endpoint}`,
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
}
