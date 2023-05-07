import React from 'react'
import { db } from "../../firebase";
import { setDoc, doc, collection, getDocs, deleteDoc, where, CollectionReference, DocumentData, query, orderBy, limit} from 'firebase/firestore'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import { storage } from '../../firebase';

  async function handlePostImage(image:File): Promise<string> {
    const nameArray = image.name.split('.')
    const name = nameArray[0]
    const imageRef = ref(storage, 'images/' + name)
    await uploadBytes(imageRef, image)
    return await getDownloadURL(imageRef)
  }


export default handlePostImage