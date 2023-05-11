
function calculateSoloElo(playerRating: number, opponentRating: number, playerWon: Boolean, goalDifference: number, K = 32) {
    const expectedOutcome = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 1500));
    const actualOutcome = playerWon ? 1 : 0;

    // Calculate the weight based on the goal difference
    const weight = 1 + (goalDifference - 1) / 2;

    const newRating = playerRating + K * weight * (actualOutcome - expectedOutcome);
    return Math.round(newRating);
}

function calculateDuoElo(player1Rating: number, player2Rating: number, player3Rating: number, player4Rating: number, team1Won: Boolean, goalDifference: number, K = 32) {
    const team1Rating = (player1Rating + player2Rating) / 2;
    const team2Rating = (player3Rating + player4Rating) / 2;

    const expectedOutcomeTeam1 = 1 / (1 + Math.pow(10, (team2Rating - team1Rating) / 1500));
    const expectedOutcomeTeam2 = 1 / (1 + Math.pow(10, (team1Rating - team2Rating) / 1500));

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

export {calculateSoloElo, calculateDuoElo}