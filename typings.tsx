export interface IPlayer {
  [key: string]: any;
  image: string;
  id: number;
  name: string;
  soloBordfodboldRating: number;
  teamBordfodboldRating: number;
  bordfodboldGamesPlayed: number;
  bordfodboldRank: number;
  soloBordTennisRating: number;
  bordTennisGamesPlayed: number;
  bordTennisRank: number;
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

export interface IBTMatch {
  id: string;
  timeStamp: Date;
  playersTeamOne: IPlayer[];
  playersTeamTwo: IPlayer[];
  teamOneScore: number;
  teamTwoScore: number;
}