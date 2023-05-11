import React from 'react'
import { IPlayer } from '../../typings'

interface props {
    players: IPlayer[];
    rank: string;
    soloRating: string;
    teamRating: string;
    gamesPlayed: string;
}

const RankList: React.FC<props> = ({ players, rank, soloRating, teamRating, gamesPlayed }) => {
    return (
        <div className='overflow-x-auto'>
            <table className='table w-full'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <td>Player</td>
                        <td>solo rating</td>
                        <td>team rating</td>
                        <td>games played</td>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => {
                        return (
                            <tr key={player.id}>
                                <th>{player[rank]}</th>
                                <td>{player.name}</td>
                                <td>{player[soloRating]}</td>
                                <td>{player[teamRating]}</td>
                                <td>{player[gamesPlayed]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RankList