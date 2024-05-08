import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MatchDetails = () => {
    let { id } = useParams();

    const [singleMatch, setSingleMatch] = useState({});
    const [activeTeam, setActiveTeam] = useState('team1');
    const [activeSquad, setActiveSquad] = useState([]);

    const setSquad = () => {
        if (activeTeam === 'team1') {
            setActiveSquad(singleMatch?.matchInfo?.team1.playerDetails);
        }
        else {
            setActiveSquad(singleMatch?.matchInfo?.team2.playerDetails);
        }
    }

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
            setSingleMatch(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMatchInfo();
    }, []);

    useEffect(() => {
        setSquad();
    }, [activeTeam, singleMatch]);

    return (
        <div className='matchDetails'>
            <div className='matchDetailsCtr'>
                <h3>{singleMatch?.matchInfo?.matchDescription} , Indian Premier League</h3>

                <div className='match'>
                    <div>
                        <img src={`/assets/${singleMatch?.matchInfo?.team1.shortName}.png`} alt="" />
                        <h2>{singleMatch?.matchInfo?.team1.shortName}</h2>
                    </div>
                    <h1>VS</h1>
                    <div>
                        <img src={`/assets/${singleMatch?.matchInfo?.team2.shortName}.png`} alt="" />
                        <h2>{singleMatch?.matchInfo?.team2.shortName}</h2>
                    </div>
                </div>

            </div>
            <div className='toggleTeam'>
                <div className="toggle">
                    <h1 className={`${activeTeam === 'team1' ? 'active' : ''}`} onClick={() => setActiveTeam('team1')} >{singleMatch?.matchInfo?.team1.shortName}</h1>
                    <h1 className={`${activeTeam === 'team2' ? 'active' : ''}`} onClick={() => setActiveTeam('team2')} >{singleMatch?.matchInfo?.team2.shortName}</h1>
                </div>

                <div className="squad">
                    {activeSquad?.map((squad, index) => (
                        <div className="player" key={index}>
                            <h2>{squad?.name}</h2>
                            <h2>{squad?.role}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MatchDetails