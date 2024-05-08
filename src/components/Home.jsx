import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

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
        <>
            <Navbar/>
            <div className="container">
                {matchesData?.map((item, index) => (
                    item.matchDetailsMap.match?.map((singleMatch, index) => {
                        // console.log(singleMatch)
                        return (
                            <Link to={`/matchDetails/${singleMatch.matchInfo.matchId}`} className="matchCard" key={index}>
                                <h3 className="matchNo">{singleMatch.matchInfo.matchDesc} {singleMatch.matchInfo.seriesName}</h3>

                                <div className="teamWithScore">
                                    <div>
                                        {/* <Image team={singleMatch.matchInfo.team1.teamSName} /> */}
                                        <img src={`/assets/${singleMatch.matchInfo.team1.teamSName}.png`} alt="" />
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
                                        <img src={`/assets/${singleMatch.matchInfo.team2.teamSName}.png`} alt="" />
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
        </>
    )
}

export default Home