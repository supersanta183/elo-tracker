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
                                        <div className='flex justify-center items-center'>
                                            <div className='mr-2'>
                                                {
                                                    match.playersTeamOne.map((player) => {
                                                        return (
                                                            <div key={player.id}>
                                                                {player.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            {
                                                match.teamOneScore > match.teamTwoScore && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                                                </svg>
                                                )
                                            }
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        <div className='flex items-center justify-center'>
                                            <div className=' mr-2'>
                                                {
                                                    match.playersTeamTwo.map((player) => {
                                                        return (
                                                            <div key={player.id}>
                                                                {player.name}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            {
                                                match.teamTwoScore > match.teamOneScore && (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                                                </svg>
                                                )
                                            }
                                        </div>
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