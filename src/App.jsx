import { useState } from "react";
import { useEffect } from "react";

function App() {

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
  },[]);

  return (
    <>
      {matchesData?.map((item, index) => (
        <h1 key={index}>
          {item.matchDetailsMap.key}
        </h1>
      ))}
    </>
  )
}

export default App
