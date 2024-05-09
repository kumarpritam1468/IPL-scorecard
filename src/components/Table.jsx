import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Table = () => {
    const [tableData, setTableData] = useState([]);

    const fetchTable = async () => {
        const url = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607/points-table';
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
            setTableData(result.pointsTable[0].pointsTableInfo);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTable();
    },[]);

    return (
        <>
            <Navbar />
            <div className='tablePage'>
                <div className="table">
                    <div className="row">
                        <h4>Teams</h4>
                        <div>
                            <h4>M</h4>
                            <h4>W</h4>
                            <h4>L</h4>
                            <h4>NRR</h4>
                            <h4>Pts</h4>
                        </div>
                    </div>

                    {tableData?.map((team, index) => (
                        <div className="row" key={index}>
                            <div>
                                <h4>{index + 1}</h4>
                                <img src={`/assets/${team.teamName}.png`} alt="" />
                                <h4>{team.teamName}</h4>
                            </div>
                            <div>
                                <h4>{team.matchesPlayed}</h4>
                                <h4>{team.matchesWon}</h4>
                                <h4>{team.matchesLost}</h4>
                                <h4>{team.nrr}</h4>
                                <h4>{team.points}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Table