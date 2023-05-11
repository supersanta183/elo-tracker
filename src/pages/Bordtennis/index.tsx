import React from 'react'
import { IPlayer } from '../../../typings'
import { handleFetchPlayers } from '@/common/handlePlayerEmilio183'
import RankList from '@/components/RankListEmilio183'

function index() {
    const [players, setPlayers] = React.useState<IPlayer[]>([])

  React.useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    const data: IPlayer[] = await handleFetchPlayers()
    data.sort((a, b) => ( //sort players by ranks in ascending order
      a.bordTennisRank - b.bordTennisRank
  ))
    setPlayers(data)
  }

  return (
    <div className='w-full'>
        <RankList players={players} soloRating='soloBordTennisRating' rank='bordTennisRank' teamRating='teamBordTennisRating' gamesPlayed='bordTennisGamesPlayed' />
    </div>
  )
}

export default index