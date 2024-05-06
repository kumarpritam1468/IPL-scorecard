import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import Image from './Image';

const Home = () => {
    const [matchesData, setMatchesData] = useState([]);

    const fetchMatchesData = async () => {
        try {
            const response = await fetch('https://cricbuzz-cricket.p.rapidapi.com/series/v1/7607', {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
                }
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchMatchesData().then((result) => {
            setMatchesData(result?.matchDetails.filter(singleData => singleData['matchDetailsMap']));
            // console.log(result);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div className="container">
            {matchesData?.map((item, index) => (
                item.matchDetailsMap.match?.map((singleMatch, index) => {
                    // console.log(singleMatch)
                    return (
                        <Link to={`/matchDetails/${singleMatch.matchInfo.matchId}/${singleMatch.matchInfo.team1.imageId}/${singleMatch.matchInfo.team2.imageId}`} className="matchCard" key={index}>
                            <h3 className="matchNo">{singleMatch.matchInfo.matchDesc} {singleMatch.matchInfo.seriesName}</h3>

                            <div className="teamWithScore">
                                <div>
                                    <Image imageId={singleMatch.matchInfo.team1.imageId} alt={'team image'} />
                                    <h2 className="team">
                                        {singleMatch.matchInfo.team1.teamSName}
                                    </h2>
                                </div>
                                <h2 className="score">
                                    {singleMatch.matchScore?.team1Score?.inngs1.runs}/{singleMatch.matchScore?.team1Score?.inngs1.wickets} ({singleMatch.matchScore?.team1Score?.inngs1.overs})
                                </h2>
                            </div>

                            <div className="teamWithScore">
                                <div>
                                    <Image imageId={singleMatch.matchInfo.team2.imageId} alt={'team image'} />
                                    <h2 className="team">
                                        {singleMatch.matchInfo.team2.teamSName}
                                    </h2>
                                </div>
                                <h2 className="score">
                                    {singleMatch.matchScore?.team2Score?.inngs1.runs}/{singleMatch.matchScore?.team2Score?.inngs1.wickets} ({singleMatch.matchScore?.team2Score?.inngs1.overs})
                                </h2>
                            </div>

                            <h3 className="result">
                                {singleMatch.matchInfo.status}
                            </h3>
                        </Link>
                    )
                })
            ))}
        </div>
    )
}

export default Home