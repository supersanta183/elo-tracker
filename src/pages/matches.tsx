import React from 'react'
import { handleFetchPlayers } from '@/common/handlePlayerEmilio183'
import { handleFetchMatches } from '@/common/handleMatchEmilio183'
import { IPlayer, IMatch } from '../../typings'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import AddMatchModal from '@/components/AddMatchModalEmilio183'

function Matches() {
    const [players, setPlayers] = useState<IPlayer[]>([])
    const [matches, setMatches] = useState<IMatch[]>([])

    React.useEffect(() => {
        fetchPlayers()
        fetchMatches()
    }, [])

    React.useEffect(() => {
        console.log(matches)
    }, [matches])

    const fetchMatches = async () => {
        const fetchedMatches: IMatch[] = await handleFetchMatches()
        setMatches(fetchedMatches)
    }

    const fetchPlayers = async () => {
        const fetchedPlayers: IPlayer[] = await handleFetchPlayers()
        setPlayers(fetchedPlayers)
    }

    return (
        <div className='overflow-clip'>
            <div className='h-screen w-screen flex flex-col justify-start pl-2'>
                <div className=''>
                    <AddMatchModal players={players} setPlayers={setPlayers} />
                </div>
                <div className=''>
                            <div>
                                <div className='overflow-x-auto'>
                                    <table className='table w-full'>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Match type</th>
                                                <th>Team one</th>
                                                <th>Team two</th>
                                                <th>Team one score</th>
                                                <th>Team two score</th>
                                                <th>Winner</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {matches.map((match, index) => {
                                            return (
                                            <tr key={match.id}>
                                                <th>{index}</th>
                                                <td>{match.type}</td>
                                                <td>
                                                    {
                                                        match.playersTeamOne.map((player) => {
                                                            return (
                                                                <div key={player.id}>
                                                                    {player.name}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        match.playersTeamTwo.map((player) => {
                                                            return (
                                                                <div key={player.id}>
                                                                    {player.name}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td>{match.teamOneScore}</td>
                                                <td>{match.teamTwoScore}</td>
                                                <td>
                                                    {
                                                        match.teamOneScore > match.teamTwoScore ? (<div>Team one</div>) : (<div>Team two</div>)
                                                    }
                                                </td>
                                            </tr>)
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default Matches