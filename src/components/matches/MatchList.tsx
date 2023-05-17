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
                            <th className='top-0 z-10 w-1/7'></th>
                            <th className='top-0 z-10 text-center w-1/7'>Match type</th>
                            <th className='top-0 z-10 text-center w-1/7'>Team one</th>
                            <th className='top-0 z-10 text-center w-1/7'>Team two</th>
                            <th className='top-0 z-10 text-center w-1/7'>Team one score</th>
                            <th className='top-0 z-10 text-center w-1/7'>Team two score</th>
                            <th className='top-0 z-10 text-center w-1/7'>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => {
                            return (
                                <tr key={match.id} className='hover'>
                                    <th className='text-center'>{index + 1}</th>
                                    <td>
                                        <div className='flex justify-center items-center'>
                                            {
                                                ("type" in match) && (match.type === 'duo' &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                                    </svg>)
                                                || (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>
                                                )
                                            }
                                        </div>
                                    </td>
                                    <td className='text-center'>
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
                                    <td className='text-center'>
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
                                    <td className='text-center'>{match.teamOneScore}</td>
                                    <td className='text-center'>{match.teamTwoScore}</td>
                                    <td className='text-center'>
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