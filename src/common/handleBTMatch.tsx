import { db } from "../../firebase";
import { setDoc, doc, collection, getDocs, deleteDoc, where, CollectionReference, DocumentData, query, orderBy, limit} from 'firebase/firestore'
import { IBTMatch } from "../../typings";

async function handleAddBTMatch(match:IBTMatch) {
  const matchRef = collection(db, 'bordTennisMatches')
  await setDoc(doc(matchRef, match.id.toString()), match)
}

async function handleFetchBTMatches(amount:number): Promise<IBTMatch[]> {
  const matchRef = collection(db, 'bordTennisMatches')
  const q = query(matchRef, orderBy("timeStamp", "desc"), limit(amount))
  const snapshot = await getDocs(q)
  const matches: IBTMatch[] = []

  snapshot.forEach(doc => {
    const matchData = doc.data()
    matches.push({...matchData, id: doc.id,} as IBTMatch)
  })
  return matches
}

export default handleAddBTMatch
export {handleFetchBTMatches}