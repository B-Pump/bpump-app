import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, workout) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `https://r77s73sc-3000.uks1.devtunnels.ms/${endpoint}/${workout}`,
    };

    const fetchData = async () => {
        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
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
};

export default useFetch;
