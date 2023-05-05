import { db } from "../../firebase";
import { setDoc, doc, collection, getDocs, deleteDoc, where, CollectionReference, DocumentData, arrayUnion, updateDoc, getDoc} from 'firebase/firestore'
import { IPlayer } from "../../typings";

async function handleAddPlayer(player:IPlayer) {
  const playerRef = collection(db, 'players')
  const playerNameRef = doc(collection(db, 'playerNames'), 'names')
  await updateDoc(playerNameRef, {names: arrayUnion(player.name)})
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

async function handleFetchPlayerNames() {
  const playerNameRef = doc(collection(db, 'playerNames'), 'names')
  const snapshot = await getDoc(playerNameRef)
  const playerNamesData = snapshot.data()
  const playerNames: string[] = playerNamesData ? playerNamesData.names : []
  return playerNames
}

export default handleAddPlayer
export { handleFetchPlayers, handleFetchPlayerNames }
