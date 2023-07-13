import React, { useState, useEffect } from 'react'
import { fetchDataFromApi } from '../utils/api'


function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
        setLoading(true)
        fetchDataFromApi(url)
            .then((res) => {
                setData(res);
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            })
            .catch((err) => {
                setLoading(false);
                setError("Err!");
            });
    }, [url])

    return { data, loading, error }
}

export default useFetch
