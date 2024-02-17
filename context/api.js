import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(method, endpoint, body = {}, refreshInterval = 300000) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: method,
        url: `https://r77s73sc-8000.uks1.devtunnels.ms/${endpoint}`,
        data: body,
    };
    const cacheKey = `apiCache_${method.toLowerCase()}_${endpoint}`;

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);

            const cachedData = await AsyncStorage.getItem(cacheKey);
            if (cachedData && JSON.stringify(JSON.parse(cachedData)) === JSON.stringify(response.data)) {
                console.info("No API updates detected, using cached data...");
            } else {
                console.info("API updates detected, fetching new data from API...");
                setData(response.data);
                await AsyncStorage.setItem(cacheKey, JSON.stringify(response.data));
            }
        } catch (error) {
            console.error("Erreur lors de la requête API :", error);
            if (error.response) {
                setError("Le serveur a répondu avec une erreur :", error.response.status);
            } else if (error.request) {
                setError("Aucune réponse reçue du serveur");
            } else {
                setError("Erreur lors de la configuration de la demande");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkForUpdates = async () => {
            try {
                const cachedData = await AsyncStorage.getItem(cacheKey);
                if (cachedData) {
                    setData(JSON.parse(cachedData));
                    // NetInfo.fetch().then((state) => {
                    //     if (state.isConnected) fetchData();
                    // });
                } else {
                    NetInfo.fetch().then((state) => {
                        if (state.isConnected) {
                            console.info("New API request made via", state.type);
                            fetchData();
                        } else {
                            setError("Les données ne sont pas dispo en raison de l'absence de Wi-Fi et du cache vide");
                        }
                    });
                }
            } catch (error) {
                console.error("Erreur lors de la vérification des mises à jour :", error);
            }
        };

        const intervalId = setInterval(() => {
            checkForUpdates();
        }, refreshInterval);

        checkForUpdates();

        return () => clearInterval(intervalId);
    }, [cacheKey, refreshInterval]);

    const refetch = () => {
        fetchData();
    };

    return { data, isLoading, error, refetch };
}
