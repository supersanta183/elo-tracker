import { db } from "../../firebase";
import { setDoc, doc, collection, getDocs, deleteDoc, where, CollectionReference, DocumentData} from 'firebase/firestore'
import { IMatch } from "../../typings";

async function handleAddMatch(match:IMatch) {
  const matchRef = collection(db, 'matches')
  await setDoc(doc(matchRef, match.id.toString()), match)
}

export default handleAddMatch
