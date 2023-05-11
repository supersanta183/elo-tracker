import React from 'react'
import { useState } from 'react'
import handleAddPlayer, { handleFetchPlayers } from '@/common/handlePlayerEmilio183'
import { IPlayer } from '../../typings'
import handlePostImage from '@/common/handleImageEmilio183'

function Players() {
    const [playerName, setPlayerName] = useState<string>('')
    const [players, setPlayers] = useState<IPlayer[]>([])

    React.useEffect(() => {
        fetchPlayers()
    }, [])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value)
    }

    const fetchPlayers = async () => {
        const data: IPlayer[] = await handleFetchPlayers()
        data.sort((a, b) => ( //sort players by ranks in ascending order
            a.bordfodboldRank - b.bordfodboldRank
        ))
        setPlayers(data)
    }

    const addPlayer = async () => {
        const player = playerName
        setPlayerName('')
        if (player !== '') {
            await handleAddPlayer({
                id: players.length + 1,
                image: "",
                name: playerName,
                soloBordfodboldRating: 1200,
                teamBordfodboldRating: 1200,
                bordfodboldGamesPlayed: 0,
                bordfodboldRank: 1,
                soloBordTennisRating: 1200,
                bordTennisGamesPlayed: 0,
                bordTennisRank: 1,
            })
            fetchPlayers()
        }
    }

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>, player: IPlayer) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = await handlePostImage(file);
            if (player) {
                player.image = url;
                await handleAddPlayer(player);
                fetchPlayers();
            }
        }
    }

    return (
        <div>
            <div className='flex items-center justify-center'>
                <div className='pb-2'><label htmlFor='add-player-modal' className='btn'>Add player</label></div>
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
            <div className='flex flex-wrap'>
                {
                    players.map((player) => {
                        return (
                            <div key={player.id} className='px-1 py-1 w-full lg:w-1/2 xl:w-1/3'>
                                <div className="card w-full h-full b-base-100 bg-base-100 shadow-xl border border-gray-800">
                                    <div className="avatar flex justify-center">
                                        <div className="w-56 rounded">
                                            <img src={player.image} />
                                        </div>
                                    </div>
                                    <div className="card-body items-center text-center">
                                        <div className='flex items-center'>
                                            <h2 className="card-title">{player.name} &nbsp;</h2>
                                            <div className="badge badge-primary">#{player.bordfodboldRank}</div>
                                        </div>
                                        <div className='stats stats-vertical lg:stats-horizontal shadow w-full'>
                                            <div className='stat place-items-center w-full lg:w-1/3'>
                                                <div className='stat-title'>Solo rating</div>
                                                <div className='stat-value'>{player.soloBordfodboldRating}</div>
                                            </div>
                                            <div className='stat place-items-center w-full lg:w-1/3'>
                                                <div className='stat-title'>team rating</div>
                                                <div className='stat-value'>{player.teamBordfodboldRating}</div>
                                            </div>
                                            <div className='stat place-items-center w-full lg:w-1/3'>
                                                <div className='stat-title'>Games played</div>
                                                <div className='stat-value'>{player.bordfodboldGamesPlayed}</div>
                                            </div>
                                        </div>

                                        <div className="card-actions">
                                            <input type="file" className="file-input w-full max-w-xs" onChange={(e) => handleImage(e, player)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Players
