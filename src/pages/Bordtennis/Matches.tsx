import React from 'react'
import { useState } from 'react'
import AddBTMatchModal from '@/components/matches/AddBTMatchModalEmilio183'
import useFetchMatches from '@/common/useFetchMatchesEmilio183'
import useFetchPlayers from '@/common/useFetchPlayersEmilio183'
import MatchList from '@/components/matches/MatchListEmilio183'

function Matches() {
    const { players, fetchPlayers } = useFetchPlayers("bordTennisRank")
    const [matchAmount, setMatchAmount] = useState<number>(20)
    const { matches, fetchMatches } = useFetchMatches("bt")

    //Handles click on "load more matches" button
    const loadMoreMatches = () => {
        fetchMatches(matchAmount + 20)
        setMatchAmount(matchAmount + 20)
    }

    return (
        <div className=''>
            <AddBTMatchModal
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