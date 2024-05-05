import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const MatchDetails = () => {
    let { id } = useParams();

    const getMatchInfo = async () => {
        const url = 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/89654';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMatchInfo();
    }, []);

    return (
        <>
            <h1>{id}</h1>
        </>
    )
}

export default MatchDetails