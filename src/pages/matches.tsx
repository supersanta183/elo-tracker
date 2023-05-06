import React from 'react'
import { handleFetchPlayers } from '@/common/handlePlayerEmilio183'
import { handleFetchMatches } from '@/common/handleMatchEmilio183'
import { IPlayer, IMatch } from '../../typings'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import AddMatchModal from '@/components/AddMatchModalEmilio183'
import InfiniteScroll from 'react-infinite-scroll-component'

function Matches() {
    const [players, setPlayers] = useState<IPlayer[]>([])
    const [matches, setMatches] = useState<IMatch[]>([])
    const [matchAmount, setMatchAmount] = useState<number>(10)

    React.useEffect(() => {
        fetchPlayers()
        fetchMatches(20)
    }, [])

    React.useEffect(() => {
        console.log(matches)
    }, [matches])

    const fetchMatches = async (amount: number) => {
        const fetchedMatches: IMatch[] = await handleFetchMatches(amount)
        setMatches(fetchedMatches)
    }

    const fetchPlayers = async () => {
        const fetchedPlayers: IPlayer[] = await handleFetchPlayers()
        setPlayers(fetchedPlayers)
    }

    const handleClick = () => {
        fetchMatches(matchAmount + 20)
        setMatchAmount(matchAmount + 20)
    }

    return (
        <div className='overflow-hidden'>
            <div className='min-h-screen max-w-screen flex flex-col justify-start'>
                <div className=''>
                    <AddMatchModal players={players} setPlayers={setPlayers} fetchMatches={fetchMatches} amount={matchAmount} />
                </div>
                <div className='z-0'>
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
                                        <tr key={match.id} className='hover'>
                                            <th>{index + 1}</th>
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
                    <div className='pl-2 pr-2'><button className='btn w-full' onClick={handleClick}>Load more matches</button></div>
                </div>
            </div>
        </div>
    )
}

export default Matches