import React, { FC, useState } from 'react'
import handleAddBTMatch from '@/common/handleBTMatchEmilio183';
import handleAddPlayer, { handleFetchPlayers } from '@/common/handlePlayerEmilio183';
import { calculateDuoElo, calculateSoloElo } from '@/common/calculateEloEmilio183';
import { v4 as uuid } from 'uuid'
import { IPlayer } from '../../../typings';

interface props {
    players: IPlayer[];
    fetchPlayers: () => void;
    fetchMatches: (amount: number) => void;
    amount: number;
}

const AddBTMatchModal: FC<props> = ({ players, fetchPlayers, fetchMatches, amount }) => {
    const [playerOne, setPlayerOne] = useState<IPlayer | null>(null)
    const [playerTwo, setPlayerTwo] = useState<IPlayer | null>(null)
    const [teamOneScore, setTeamOneScore] = useState<number>(0)
    const [teamTwoScore, setTeamTwoScore] = useState<number>(0)
    const [teamSize, setTeamSize] = useState<number>(1)

    const handlePostMatch = () => {
        postSoloMatch()
        fetchMatches(amount)

    }

    const postSoloMatch = async () => {
        if (!playerOne || !playerTwo) return
        playerOne.soloBordTennisRating = calculateSoloElo(playerOne.soloBordTennisRating, playerTwo.soloBordTennisRating, teamOneScore > teamTwoScore, Math.abs(teamOneScore - teamTwoScore))
        playerOne.bordTennisGamesPlayed += 1
        playerTwo.soloBordTennisRating = calculateSoloElo(playerTwo.soloBordTennisRating, playerOne.soloBordTennisRating, teamTwoScore > teamOneScore, Math.abs(teamOneScore - teamTwoScore))
        playerTwo.bordTennisGamesPlayed += 1
        handleAddPlayer(playerOne)
        handleAddPlayer(playerTwo)
        const match = {
            id: uuid(),
            timeStamp: new Date(),
            playersTeamOne: [playerOne],
            playersTeamTwo: [playerTwo],
            teamOneScore: teamOneScore,
            teamTwoScore: teamTwoScore,
        }
        await handleAddBTMatch(match)
        await updateRankings()
        fetchPlayers()
    }

    const updateRankings = async () => {
        let tempPlayers: IPlayer[] = await handleFetchPlayers()
        tempPlayers.sort((a, b) => (
            b.soloBordTennisRating - a.soloBordTennisRating
        ))
        for (let i = 0; i < tempPlayers.length; i++) {
            if (i === 0) {
                tempPlayers[i].bordTennisRank = 1
                await handleAddPlayer(tempPlayers[i])
                continue
            }
            if (tempPlayers[i].soloBordTennisRating === tempPlayers[i - 1].soloBordTennisRating) {
                tempPlayers[i].bordTennisRank = tempPlayers[i - 1].bordTennisRank
                await handleAddPlayer(tempPlayers[i])
                continue
            } else {
                tempPlayers[i].bordTennisRank = tempPlayers[i - 1].bordTennisRank + 1
                await handleAddPlayer(tempPlayers[i])
                continue
            }
        }
    }

    return (
        <div className='w-full pr-2'>
            {/* plus button to add a match */}
            <div className='fixed z-10 bottom-14 right-0  flex items-end justify-end'>
                <label htmlFor='add-player-modal' className='btn z-10 rounded-full mr-5 lg:mr-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
            </div>
            <input type="checkbox" id="add-player-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="add-player-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold pb-2 text-center">Add a match!</h3>
                    <div className='flex justify-center'>
                        <select className="select select-bordered w-full max-w-xs mb-2" onChange={(e) => setTeamSize(parseInt(e.target.value))}>
                            <option disabled defaultValue={1}>Teamsize</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </div>
                    <div className='flex'>
                        {/* team one */}
                        <div className='w-1/2'>
                            <h2 className='text-center'>Team 1</h2>
                            <select className="select select-bordered w-full max-w-xs " value={playerOne ? JSON.stringify(playerOne) : ""} onChange={(e) => setPlayerOne(JSON.parse(e.target.value))}>
                                <option selected value={JSON.stringify(null)}>Select player</option>
                                {
                                    players.map((player) => {
                                        return <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                    })
                                }
                            </select>
                            <div className="form-control w-full max-w-xs">
                                <label className="label flex justify-center">
                                    <span className="label-text">Team 1 score</span>
                                </label>
                                <select className="select select-bordered" onChange={(e) => setTeamOneScore(parseInt(e.target.value))}>
                                    {
                                        Array.from({ length: 11 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {i}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>


                        </div>
                        {/* team two */}
                        <div className='w-1/2'>
                            <h2 className='text-center'>Team 2</h2>
                            <select className="select select-bordered w-full max-w-xs " value={playerTwo ? JSON.stringify(playerTwo) : ""} onChange={(e) => setPlayerTwo(JSON.parse(e.target.value))}>
                                <option selected value={JSON.stringify(null)}>Select player</option>
                                {
                                    players.map((player) => {
                                        return <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                    })
                                }
                            </select>
                            <div className="form-control w-full max-w-xs">
                                <label className="label flex justify-center">
                                    <span className="label-text">Team 2 score</span>
                                </label>
                                <select className="select select-bordered" onChange={(e) => setTeamTwoScore(parseInt(e.target.value))}>
                                    {
                                        Array.from({ length: 11 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {i}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="modal-action">
                        <div className='w-full'><label htmlFor="add-player-modal" onClick={handlePostMatch} className="btn w-full">Add match</label></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBTMatchModal