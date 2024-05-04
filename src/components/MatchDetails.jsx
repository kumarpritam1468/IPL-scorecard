import React from 'react'
import { useParams } from 'react-router-dom'

const MatchDetails = () => {
    let {id} = useParams();

    return (
        <>
            <h1>{id}</h1>
        </>
    )
}

export default MatchDetails