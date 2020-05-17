import { useEffect, useState } from 'react'
import { firestore } from 'firebase/app'

export const Operators = {
  EQUALS: '==',
  ARRAY_CONTAINS: 'array-contains'
}

export const CollectionNames = {
  Users: 'users',
  Assets: 'assets'
}

export const AssetFieldNames = {
  isAdult: 'isAdult',
  tags: 'tags'
}

function getWhereClausesAsString(whereClauses) {
  if (!whereClauses) {
    return ''
  }
  if (getIsGettingSingleRecord(whereClauses)) {
    return whereClauses
  }
  return whereClauses
    .map(([fieldName, operator, value]) => `${fieldName}.${operator}.${value}`)
    .join(',')
}

function getIsGettingSingleRecord(whereClauses) {
  return typeof whereClauses === 'string'
}

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

async function formatRawDoc(doc) {
  const formattedDocs = await formatRawDocs([doc])
  return formattedDocs[0]
}

async function formatRawDocs(docs) {
  const docsWithDates = docs
    .map(doc => ({ ...doc.data(), id: doc.id }))
    .map(mapDates)

  return Promise.all(docsWithDates.map(mapReferences))
}

// function validateWhereClauses(whereClauses) {
//   if (!whereClauses) {
//     throw new Error('No where clauses provided!')
//   }

//   if (!(typeof whereClauses !== 'string')) {
//     if (!(whereClauses instanceof Array)) {
//       throw new Error(
//         `Where clauses must be an id (string) or array of field,operator,value but got: ${typeof whereClauses}`
//       )
//     }
//   }
// }

export default (
  collectionName,
  whereClauses,
  limit,
  orderBy,
  subscribe = true
) => {
  const [recordOrRecords, setRecordOrRecords] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isErrored, setIsErrored] = useState(false)

  // validateWhereClauses(whereClauses)

  const whereClausesAsString = getWhereClausesAsString(whereClauses)

  async function doIt() {
    try {
      setIsLoading(true)
      setIsErrored(false)

      const isGettingSingleRecord = getIsGettingSingleRecord(whereClauses)

      let queryChain = firestore().collection(collectionName)

      // If an ID
      if (isGettingSingleRecord) {
        const id = whereClauses
        queryChain = queryChain.doc(id)
        // or an array of searches
      } else if (Array.isArray(whereClauses)) {
        for (const [field, operator, value] of whereClauses) {
          queryChain = queryChain.where(field, operator, value)
        }
        // or undefined - all results
      } else {
      }

      if (limit) {
        queryChain = queryChain.limit(limit)
      }

      async function processResults(results) {
        if (isGettingSingleRecord) {
          setRecordOrRecords(await formatRawDoc(results))
        } else {
          setRecordOrRecords(await formatRawDocs(results.docs))
        }

        setIsLoading(false)
        setIsErrored(false)
      }

      if (subscribe) {
        queryChain.onSnapshot(processResults)
      } else {
        processResults(await queryChain.get())

        setIsLoading(false)
        setIsErrored(false)
      }

      // const results = await queryChain.get()

      // const numResults = results.docs.length

      // if (isGettingSingleRecord && numResults !== 1) {
      //   throw new Error(
      //     `Expected single result when querying collection by id (${whereClauses}) - but got ${numResults} - where clause: ${whereClausesAsString}`
      //   )
      // }

      // if (isGettingSingleRecord) {
      //   setRecordOrRecords(await formatRawDoc(results))
      // } else {
      //   setRecordOrRecords(await formatRawDocs(results.docs))
      // }
    } catch (err) {
      console.error(err)
      setIsLoading(false)
      setIsErrored(true)
    }
  }

  useEffect(() => {
    if (whereClauses === false) {
      return
    }

    doIt()

    return () => {}
  }, [collectionName, whereClausesAsString])

  return [isLoading, isErrored, recordOrRecords]
}
