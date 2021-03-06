import { useState, useEffect } from 'react'
import { firestore } from 'firebase/app'

const secondsToDate = seconds => new Date(seconds * 1000)

const mapDates = doc => {
  const entries = Object.entries(doc)

  const newDoc = entries.reduce((finalDoc, [key, value]) => {
    return {
      ...finalDoc,
      [key]:
        value && value.hasOwnProperty('seconds')
          ? secondsToDate(value.seconds)
          : value
    }
  }, {})

  return newDoc
}

const getDataFromReference = async record => {
  const result = await record.get()
  return {
    ...result.data(),
    id: record.id
  }
}

const mapReferences = async doc => {
  const newDoc = { ...doc }

  const results = await Promise.all(
    Object.entries(newDoc).map(async ([key, value]) => {
      if (value && value instanceof firestore.DocumentReference) {
        return [key, await getDataFromReference(value)]
      }
      return [key, await Promise.resolve(value)]
    })
  )

  results.forEach(([key, value]) => (newDoc[key] = value))

  return newDoc
}

export default (
  collectionName,
  documentId = null,
  searchObj = null,
  useRefs = true
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const [results, setResults] = useState(documentId ? null : [])

  const getData = async () => {
    setIsLoading(true)

    try {
      const collection = firestore().collection(collectionName)

      let query

      if (documentId) {
        const doc = await collection.doc(documentId).get()
        const data = await doc.data()

        if (!data) {
          setIsLoading(false)
          setResults(null)
          return
        }

        const docsWithDates = mapDates({
          ...data,
          id: documentId
        })

        const mappedDoc = useRefs
          ? await mapReferences(docsWithDates)
          : docsWithDates

        setIsLoading(false)
        setResults(mappedDoc)
        return
      }

      if (searchObj) {
        if (searchObj instanceof Array) {
          query = searchObj.reduce((queryChain, searchObjChild) => {
            let value

            if (searchObjChild.reference) {
              value = firestore()
                .collection(searchObjChild.reference.collection)
                .doc(searchObjChild.reference.id)
            } else {
              value = searchObjChild.value
            }

            return queryChain.where(
              searchObjChild.field,
              searchObjChild.operator,
              value
            )
          }, collection)
        } else if (searchObj.reference) {
          const reference = firestore()
            .collection(searchObj.reference.collection)
            .doc(searchObj.reference.id)

          query = collection.where(
            searchObj.field,
            searchObj.operator,
            reference
          )
        } else {
          query = collection.where(
            searchObj.field,
            searchObj.operator,
            searchObj.value
          )
        }
      } else {
        query = collection
      }

      const results = await query.get()

      setIsLoading(false)

      const docs = results.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .map(mapDates)
      const docsWithReferences = useRefs
        ? await Promise.all(docs.map(mapReferences))
        : docs

      setResults(docsWithReferences)
    } catch (err) {
      setIsErrored(true)
      setIsLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return [isLoading, isErrored, results, getData]
}
