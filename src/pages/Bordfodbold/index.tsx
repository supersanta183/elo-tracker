import { Inter } from 'next/font/google'
import React, { useEffect, Component } from 'react'
import { IPlayer } from '../../../typings'
import handleAddPlayer, { handleFetchPlayers } from '@/common/handlePlayerEmilio183'
import { useState } from 'react'
import RankList from '@/components/RankListEmilio183'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [players, setPlayers] = useState<IPlayer[]>([])

  React.useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    const data: IPlayer[] = await handleFetchPlayers()
    data.sort((a, b) => ( //sort players by ranks in ascending order
      a.bordfodboldRank - b.bordfodboldRank
    ))
    setPlayers(data)
  }

  if (players.length === 0) return <div>Loading...</div>

  return (
    <div className='w-full'>
      <RankList players={players} soloRating='soloBordfodboldRating' rank='bordfodboldRank' teamRating='teamBordfodboldRating' gamesPlayed='bordfodboldGamesPlayed' />
    </div>
  )
}
