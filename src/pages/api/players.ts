// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { IPlayer } from '../../../typings'

type Data = {
  players: IPlayer[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    //let players: IPlayer[] = [{ id: 1, name: 'Emil', soloRating: 1200, teamRating: 1200, game rank: 1 }, { id: 2, name: 'Oliver', soloRating: 0, teamRating: 0, rank: 0}]
  //res.status(200).json({ players })
}