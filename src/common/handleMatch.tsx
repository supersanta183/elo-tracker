import { db } from "../../firebase";
import { setDoc, doc, collection, getDocs, deleteDoc, where, CollectionReference, DocumentData, query, orderBy, limit} from 'firebase/firestore'
import { IMatch } from "../../typings";

async function handleAddMatch(match:IMatch) {
  const matchRef = collection(db, 'matches')
  await setDoc(doc(matchRef, match.id.toString()), match)
}

async function handleFetchMatches(amount:number): Promise<IMatch[]> {
  const matchRef = collection(db, 'matches')
  const q = query(matchRef, orderBy("timeStamp", "desc"), limit(amount))
  const snapshot = await getDocs(q)
  const matches: IMatch[] = []

  snapshot.forEach(doc => {
    const matchData = doc.data()
    matches.push({...matchData, id: doc.id,} as IMatch)
  })
  return matches
}

export default handleAddMatch
export {handleFetchMatches}
