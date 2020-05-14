import { useState, useEffect, useRef } from 'react'
import { firestore } from 'firebase/app'

const secondsToDate = seconds => {
  const t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(seconds)
  return t
}

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
  return result.data()
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
  fieldNameOrQueries,
  operator,
  value,
  useRefs = true
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const [results, setResults] = useState([])
  const timer = useRef()

  let queries =
    fieldNameOrQueries instanceof Array
      ? fieldNameOrQueries
      : [
          {
            fieldName: fieldNameOrQueries,
            operator,
            value
          }
        ]

  const getData = async () => {
    setIsLoading(true)

    try {
      const collection = firestore().collection(collectionName)

      queries.forEach(({ fieldName, operator, value }) => {
        collection.where(fieldName, operator, value)
      })

      const query = await collection.get()

      setIsLoading(false)

      const docs = query.docs
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

  const queriesAsString = queries
    .map(
      ({ fieldName, operator, value }) =>
        `${fieldName}.${operator}.${
          value instanceof Array ? value.join('===') : value
        }`
    )
    .join('+')

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => getData(), 500)
  }, [queriesAsString])

  return [isLoading, isErrored, results]
}
