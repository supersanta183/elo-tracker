import React from 'react'
import { handleFetchPlayers } from '@/common/handlePlayerEmilio183'
import handleAddPlayer from '@/common/handlePlayerEmilio183'
import { IPlayer } from '../../typings'
import handleAddMatch from '@/common/handleSoloMatchEmilio183'
import { v4 as uuid } from 'uuid'
import { useState } from 'react'
import AddMatchModal from '@/components/addMatchModalEmilio183'

function Matches() {
    const [teamSize, setTeamSize] = useState<number>(1)
    const [players, setPlayers] = useState<IPlayer[]>([])
    const [playerOne, setPlayerOne] = useState<IPlayer | null>(null)
    const [playerTwo, setPlayerTwo] = useState<IPlayer | null>(null)
    const [playerThree, setPlayerThree] = useState<IPlayer | null>(null)
    const [playerFour, setPlayerFour] = useState<IPlayer | null>(null)
    const [teamOneScore, setTeamOneScore] = useState<number>(0)
    const [teamTwoScore, setTeamTwoScore] = useState<number>(0)

    React.useEffect(() => {
        fetchPlayers()
    }, [])

    const fetchPlayers = async () => {
        const data: IPlayer[] = await handleFetchPlayers()
        setPlayers(data)
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <AddMatchModal players={players} setPlayers={setPlayers} />
        </div>
    )
}

export default Matches