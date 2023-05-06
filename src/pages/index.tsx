import { Inter } from 'next/font/google'
import React, { useEffect, Component } from 'react'
import { IPlayer } from '../../typings'
import handleAddPlayer, {handleFetchPlayers} from '@/common/handlePlayerEmilio183'
import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [players, setPlayers] = useState<IPlayer[]>([])

  React.useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    const data: IPlayer[] = await handleFetchPlayers()
    data.sort((a, b) => ( //sort players by ranks in ascending order
      a.rank - b.rank
  ))
    setPlayers(data)
  }

  if (players.length === 0) return <div>Loading...</div>

  return (
    <div className='w-full'>
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
                  <th>{player.rank}</th>
                  <td>{player.name}</td>
                  <td>{player.soloRating}</td>
                  <td>{player.teamRating}</td>
                  <td>{player.gamesPlayed}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
