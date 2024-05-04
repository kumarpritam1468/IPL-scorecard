import React, { useEffect, useState } from 'react'

const Image = ({ imageId, alt }) => {

    const [imageUrl, setImageUrl] = useState('');

    const fetchImage = async () => {
        const url = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            setImageUrl(response.url);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <img src={imageUrl} alt={alt} />
    )
}

export default Image