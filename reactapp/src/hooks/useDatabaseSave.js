import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default (collectionName, documentId = null) => {
  const [isSaving, setIsSaving] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)

  if (!collectionName) {
    throw new Error('No collection name provided!')
  }

  const save = async fields => {
    setIsSuccess(null)
    setIsSaving(true)

    let document

    try {
      const collection = firebase.firestore().collection(collectionName)

      if (documentId) {
        await collection.doc(documentId).set(fields, { merge: true })
      } else {
        document = await collection.add(fields)
      }

      setIsSuccess(true)
      setIsSaving(false)

      return [documentId ? documentId : document.id]
    } catch (err) {
      setIsSuccess(false)
      setIsSaving(false)
      console.error(err)
    }
  }

  return [isSaving, isSuccess, save]
}
