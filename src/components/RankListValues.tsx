import React from 'react'
import { IPlayer } from '../../typings'

interface props {
    player: IPlayer;
    rank: number;
    soloRating: number;
    teamRating: number;
    gamesPlayed: number;
}

const RankListValues: React.FC<props> = ({ player, rank, soloRating, teamRating, gamesPlayed }) => {
    return (
        <tr>
            <th>{rank}</th>
            <td>{player.name}</td>
            <td>{soloRating}</td>
            <td>{teamRating}</td>
            <td>{gamesPlayed}</td>
        </tr>
    )
}

export default RankListValues