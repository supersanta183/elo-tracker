import React from 'react'
import { useState } from 'react'
import AddBFMatchModal from '@/components/matches/AddBFMatchModalEmilio183'
import useFetchMatches from '@/common/useFetchMatchesEmilio183'
import useFetchPlayers from '@/common/useFetchPlayersEmilio183'
import MatchList from '@/components/matches/MatchListEmilio183'

function Matches() {
    const { players, fetchPlayers } = useFetchPlayers("bordfodboldRank")
    const [matchAmount, setMatchAmount] = useState<number>(20)
    const { matches, fetchMatches } = useFetchMatches("bf")

    //Handles click on "load more matches" button
    const loadMoreMatches = () => {
        fetchMatches(matchAmount + 20)
        setMatchAmount(matchAmount + 20)
    }

    return (
        <div className=''>
            <AddBFMatchModal
                fetchPlayers={fetchPlayers}
                players={players}
                fetchMatches={fetchMatches}
                amount={matchAmount}
            />
            <MatchList matches={matches} handleClick={loadMoreMatches}/>
        </div>
    )
}

export default Matches
