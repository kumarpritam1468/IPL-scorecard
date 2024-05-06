import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Image from './Image';

const MatchDetails = () => {
    let { id, imgId1, imgId2 } = useParams();
    const [singleMatch, setSingleMatch] = useState({});

    const getMatchInfo = async () => {
        const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}`;
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
            console.log(singleMatch?.matchInfo?.team1.shortName);
            setSingleMatch(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMatchInfo();
    }, []);

    return (
        <div className='matchDetails'>
            <div className='matchDetailsCtr'>
                <h3>{singleMatch?.matchInfo?.matchDescription} , Indian Premier League</h3>

                <div className='match'>
                    <div>
                        <Image imageId={imgId1} />
                        <h2>{singleMatch?.matchInfo?.team1.shortName}</h2>
                    </div>
                    <h1>VS</h1>
                    <div>
                        <Image imageId={imgId2} />
                        <h2>{singleMatch?.matchInfo?.team2.shortName}</h2>
                    </div>
                </div>

            </div>
            <div className='toggleTeam'>
                <h1>{singleMatch?.matchInfo?.team1.shortName}</h1>
                <h1>{singleMatch?.matchInfo?.team2.shortName}</h1>
            </div>
        </div>
    )
}

export default MatchDetails