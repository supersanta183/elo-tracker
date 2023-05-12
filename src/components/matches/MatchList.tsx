import React from 'react'
import { IMatch, IBTMatch } from '../../../typings'

interface props {
    matches: IMatch[] | IBTMatch[];
    handleClick: () => void;
}

const MatchList: React.FC<props> = ({ matches, handleClick }) => {
    return (
        <div className='min-h-screen max-w-screen flex flex-col justify-start'>
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
                                    <td>{("type" in match) ? match.type : "N/A"}</td>
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
                                        {match.teamOneScore > match.teamTwoScore ? (
                                            <div>Team one</div>
                                        ) : (
                                            <div>Team two</div>)}
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
            <div className='pl-2 pr-2'><button className='btn w-full' onClick={handleClick}>Load more matches...</button></div>
        </div>
    )
}

export default MatchList