import React from 'react'
import { IPlayer } from '../../typings'
import RankListValues from './RankListValues'

interface props {
    players: IPlayer[];
    rank: string;
    soloRating: string;
    teamRating: string;
    gamesPlayed: string;
}

const RankList: React.FC<props> = ({players, rank, soloRating, teamRating, gamesPlayed}) => {
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
                <div key={player.id}>
                    <RankListValues player={player} rank={player[rank]} soloRating={player[soloRating]} teamRating={player[teamRating]} gamesPlayed={player[gamesPlayed]} />
                </div>
              )
            })}
          </tbody>
        </table>
      </div>
  )
}

export default RankList