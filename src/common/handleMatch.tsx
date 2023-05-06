import { db } from "../../firebase";
import { setDoc, doc, collection, getDocs, deleteDoc, where, CollectionReference, DocumentData} from 'firebase/firestore'
import { IMatch } from "../../typings";

async function handleAddMatch(match:IMatch) {
  const matchRef = collection(db, 'matches')
  await setDoc(doc(matchRef, match.id.toString()), match)
}

async function handleFetchMatches(): Promise<IMatch[]> {
  const matchRef = collection(db, 'matches')
  const snapshot = await getDocs(matchRef)
  const matches: IMatch[] = []

  snapshot.forEach(doc => {
    const matchData = doc.data()
    matches.push({...matchData, id: doc.id,} as IMatch)
  })
  return matches
}

export default handleAddMatch
export {handleFetchMatches}
