import { useState, useEffect } from "react"
import { Alert } from "react-native"
import axios from "axios"

const useFetch = (endpoint) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: "GET",
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/${endpoint}`,
        headers: {
            "X-RapidAPI-Key":
                "6e3d131171msh3555abaa618c04bp100003jsn9659c1946681",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
    }

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.request(options)
            console.log(response.data)
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            Alert.alert(
                "Erreur de l'API",
                "Erreur lors du chargement des données",
            )
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch }
}

export default useFetch
