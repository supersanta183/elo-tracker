import React from 'react'
import handleAddPlayer, {handleFetchPlayers} from '@/common/handlePlayerEmilio183'
import { IPlayer } from '../../typings'

function players() {
    const [playerName, setPlayerName] = React.useState<string>('')
    const [players, setPlayers] = React.useState<IPlayer[]>([])

    React.useEffect(() => {
        fetchPlayers()
    }, [])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value)
    }

    const fetchPlayers = async () => {
        const data: IPlayer[] = await handleFetchPlayers()
        setPlayers(data)
      }

    const addPlayer = async () => {
        const player = playerName
        setPlayerName('')
        if (player !== '') {
            await handleAddPlayer({
                id: players.length + 1,
                name: playerName,
                soloRating: 1200,
                teamRating: 1200,
                gamesPlayed: 0,
                rank: 1,
            })
            fetchPlayers()
        }
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <label htmlFor='add-player-modal' className='btn'>Add player</label>

            <input type="checkbox" id="add-player-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-player-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold pb-2">Add a player!</h3>
                    <input type="text" placeholder="name" onChange={handleNameChange} className="input input-bordered w-full max-w-xs" />
                    <div className="modal-action">
                        <label htmlFor="add-player-modal" onClick={addPlayer} className="btn">Add player</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default players