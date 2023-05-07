export interface IPlayer {
    image: string;
    id: number;
    name: string;
    soloRating: number;
    teamRating: number;
    gamesPlayed: number;
    rank: number;
  }

export interface IMatch {
    id: string;
    type: string;
    timeStamp: Date;
    playersTeamOne: IPlayer[];
    playersTeamTwo: IPlayer[];
    teamOneScore: number;
    teamTwoScore: number;
}