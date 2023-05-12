import { db } from "../../firebase";
import { setDoc, doc, collection, getDocs, deleteDoc, where, CollectionReference, DocumentData, arrayUnion, updateDoc, getDoc} from 'firebase/firestore'
import { IPlayer } from "../../typings";

//handles posting and fetching of players

async function handleAddPlayer(player:IPlayer) {
  const playerRef = collection(db, 'players')
  await setDoc(doc(playerRef, player.id.toString()), player)
}

async function handleFetchPlayers(): Promise<IPlayer[]> {
  const playerRef = collection(db, 'players')
  const snapshot = await getDocs(playerRef)
  const players: IPlayer[] = []

  snapshot.forEach(doc => {
    const playerData = doc.data()
    players.push({...playerData, id: parseInt(doc.id),} as IPlayer)
  })

  return players
}

export default handleAddPlayer
export { handleFetchPlayers}
