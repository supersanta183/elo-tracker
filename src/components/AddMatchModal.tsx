import React, { FC, useState } from 'react'
import { IPlayer, IMatch } from '../../typings';
import handleAddMatch from '@/common/handleMatchEmilio183';
import handleAddPlayer, { handleFetchPlayers } from '@/common/handlePlayerEmilio183';
import { v4 as uuid } from 'uuid'

interface props {
    players: IPlayer[];
    setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
    fetchMatches: (amount: number) => void;
    amount: number;
}

const AddMatchModal: FC<props> = ({ players, setPlayers, fetchMatches, amount }) => {
    const [playerOne, setPlayerOne] = useState<IPlayer | null>(null)
    const [playerTwo, setPlayerTwo] = useState<IPlayer | null>(null)
    const [playerThree, setPlayerThree] = useState<IPlayer | null>(null)
    const [playerFour, setPlayerFour] = useState<IPlayer | null>(null)
    const [teamOneScore, setTeamOneScore] = useState<number>(0)
    const [teamTwoScore, setTeamTwoScore] = useState<number>(0)
    const [teamSize, setTeamSize] = useState<number>(1)

    const handlePostMatch = () => {
        if (teamSize === 1) {
            postSoloMatch()
            fetchMatches(amount)
        } else if (teamSize === 2) {
            postDuoMatch()
            fetchMatches(amount)
        }
    }

    const postSoloMatch = async () => {
        if (!playerOne || !playerThree) return
        playerOne.soloRating = calculateSoloElo(playerOne.soloRating, playerThree.soloRating, teamOneScore > teamTwoScore, Math.abs(teamOneScore - teamTwoScore))
        playerOne.gamesPlayed += 1
        playerThree.soloRating = calculateSoloElo(playerThree.soloRating, playerOne.soloRating, teamTwoScore > teamOneScore, Math.abs(teamOneScore - teamTwoScore))
        playerThree.gamesPlayed += 1
        handleAddPlayer(playerOne)
        handleAddPlayer(playerThree)
        const match = {
            id: uuid(),
            type: "solo",
            timeStamp: new Date(),
            playersTeamOne: [playerOne],
            playersTeamTwo: [playerThree],
            teamOneScore: teamOneScore,
            teamTwoScore: teamTwoScore,
        }
        await handleAddMatch(match)
        await updateRankings()
    }

    const postDuoMatch = async () => {
        if (!playerOne || !playerTwo || !playerThree || !playerFour) return
        const newRatings = calculateDuoElo(playerOne.teamRating, playerTwo.teamRating, playerThree.teamRating, playerFour.teamRating, teamOneScore > teamTwoScore, Math.abs(teamOneScore - teamTwoScore))
        playerOne.teamRating = newRatings[0]
        playerOne.gamesPlayed += 1
        playerTwo.teamRating = newRatings[1]
        playerTwo.gamesPlayed += 1
        playerThree.teamRating = newRatings[2]
        playerThree.gamesPlayed += 1
        playerFour.teamRating = newRatings[3]
        playerFour.gamesPlayed += 1
        handleAddPlayer(playerOne)
        handleAddPlayer(playerTwo)
        handleAddPlayer(playerThree)
        handleAddPlayer(playerFour)
        const match = {
            id: uuid(),
            type: "duo",
            timeStamp: new Date(),
            playersTeamOne: [playerOne, playerTwo],
            playersTeamTwo: [playerThree, playerFour],
            teamOneScore: teamOneScore,
            teamTwoScore: teamTwoScore,
        }
        await handleAddMatch(match)
        await updateRankings()
    }

    const updateRankings = async () => {
        let tempPlayers: IPlayer[] = await handleFetchPlayers()
        tempPlayers.sort((a, b) => (
            b.soloRating - a.soloRating
        ))
        for (let i = 0; i < tempPlayers.length; i++) {
            if (i === 0) {
                tempPlayers[i].rank = 1
                await handleAddPlayer(tempPlayers[i])
                continue
            }
            if (tempPlayers[i].soloRating === tempPlayers[i - 1].soloRating) {
                tempPlayers[i].rank = tempPlayers[i - 1].rank
                await handleAddPlayer(tempPlayers[i])
                continue
            } else {
                tempPlayers[i].rank = tempPlayers[i - 1].rank + 1
                await handleAddPlayer(tempPlayers[i])
                continue
            }
        }
    }

    function calculateSoloElo(playerRating: number, opponentRating: number, playerWon: Boolean, goalDifference: number, K = 10) {
        const expectedOutcome = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
        const actualOutcome = playerWon ? 1 : 0;

        // Calculate the weight based on the goal difference
        const weight = 1 + (goalDifference - 1) / 2;

        const newRating = playerRating + K * weight * (actualOutcome - expectedOutcome);
        return Math.round(newRating);
    }

    function calculateDuoElo(player1Rating: number, player2Rating: number, player3Rating: number, player4Rating: number, team1Won: Boolean, goalDifference: number, K = 10) {
        const team1Rating = (player1Rating + player2Rating) / 2;
        const team2Rating = (player3Rating + player4Rating) / 2;

        const expectedOutcomeTeam1 = 1 / (1 + Math.pow(10, (team2Rating - team1Rating) / 400));
        const expectedOutcomeTeam2 = 1 / (1 + Math.pow(10, (team1Rating - team2Rating) / 400));

        const actualOutcomeTeam1 = team1Won ? 1 : 0;
        const actualOutcomeTeam2 = team1Won ? 0 : 1;

        const weight = 1 + (goalDifference - 1) / 2;

        const ratingChangeTeam1 = K * weight * (actualOutcomeTeam1 - expectedOutcomeTeam1) / 2; // Distribute K factor between two players
        const ratingChangeTeam2 = K * weight * (actualOutcomeTeam2 - expectedOutcomeTeam2) / 2; // Distribute K factor between two players

        const newPlayer1Rating = player1Rating + ratingChangeTeam1;
        const newPlayer2Rating = player2Rating + ratingChangeTeam1;
        const newPlayer3Rating = player3Rating + ratingChangeTeam2;
        const newPlayer4Rating = player4Rating + ratingChangeTeam2;

        return [Math.round(newPlayer1Rating), Math.round(newPlayer2Rating), Math.round(newPlayer3Rating), Math.round(newPlayer4Rating)];
    }



    return (
        <div className='w-full pr-2'>
            {/* plus button to add a match */}
            <div className='fixed z-10 top-0 left-0 w-screen h-screen-50 flex items-end justify-end'>
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
                            {
                                teamSize === 2 &&
                                <select className="select select-bordered w-full max-w-xs " value={playerTwo ? JSON.stringify(playerTwo) : ""} onChange={(e) => setPlayerTwo(JSON.parse(e.target.value))}>
                                    <option selected value={JSON.stringify(null)}>Select player</option>
                                    {
                                        players.map((player) => {
                                            return <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                        })
                                    }
                                </select>
                            }
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
                            <select className="select select-bordered w-full max-w-xs " value={playerThree ? JSON.stringify(playerThree) : ""} onChange={(e) => setPlayerThree(JSON.parse(e.target.value))}>
                                <option selected value={JSON.stringify(null)}>Select player</option>
                                {
                                    players.map((player) => {
                                        return <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                    })
                                }
                            </select>
                            {
                                teamSize === 2 &&
                                <select className="select select-bordered w-full max-w-xs " value={playerFour ? JSON.stringify(playerFour) : ""} onChange={(e) => setPlayerFour(JSON.parse(e.target.value))}>
                                    <option selected value={JSON.stringify(null)}>Select player</option>
                                    {
                                        players.map((player) => {
                                            return <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                        })
                                    }
                                </select>
                            }
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

export default AddMatchModal