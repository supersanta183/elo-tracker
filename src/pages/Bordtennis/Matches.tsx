import React from 'react'
import { handleFetchPlayers } from '@/common/handlePlayerEmilio183'
import { handleFetchBTMatches } from '@/common/handleBTMatchEmilio183'
import { IPlayer, IBTMatch } from '../../../typings'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import AddBTMatchModal from '@/components/AddBTMatchModalEmilio183'
import InfiniteScroll from 'react-infinite-scroll-component'

function Matches() {
    const [players, setPlayers] = useState<IPlayer[]>([])
    const [matches, setMatches] = useState<IBTMatch[]>([])
    const [matchAmount, setMatchAmount] = useState<number>(20)

    React.useEffect(() => {
        fetchPlayers()
        fetchMatches(20)
    }, [])

    React.useEffect(() => {
        console.log(matches)
    }, [matches])

    const fetchMatches = async (amount: number) => {
        const fetchedMatches: IBTMatch[] = await handleFetchBTMatches(amount)
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
        <div className=''>
            <div className='min-h-screen max-w-screen flex flex-col justify-start'>
                <div className=''>
                    <AddBTMatchModal fetchPlayers={fetchPlayers} players={players} setPlayers={setPlayers} fetchMatches={fetchMatches} amount={matchAmount} />
                </div>
                <div className='overflow-x-auto'>
                    <table className='table w-full'>
                        <thead>
                            <tr>
                                <th className='top-0 z-10'></th>
                                <th className='top-0 z-10'>Match type</th>
                                <th className='top-0 z-10'>Team one</th>
                                <th className='top-0 z-10'>Team two</th>
                                <th className='top-0 z-10'>Team one score</th>
                                <th className='top-0 z-10'>Team two score</th>
                                <th className='top-0 z-10'>Winner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map((match, index) => {
                                return (
                                    <tr key={match.id} className='hover'>
                                        <th>{index + 1}</th>
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
    )
}

export default Matches
