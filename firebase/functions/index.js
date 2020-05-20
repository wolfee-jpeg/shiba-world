const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')

const ALGOLIA_APP_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.admin_api_key

const ALGOLIA_INDEX_NAME = 'prod_ASSETS'
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

function convertDocToAlgoliaRecord(docId, doc) {
  return {
    objectID: docId,
    title: doc.title,
    description: doc.description,
    thumbnailUrl: doc.thumbnailUrl,
    isAdult: doc.isAdult,
    tags: doc.tags,
  }
}

function insertDocIntoIndex(doc) {
  return client
    .initIndex(ALGOLIA_INDEX_NAME)
    .saveObject(convertDocToAlgoliaRecord(doc.id, doc.data()))
}

exports.onAssetCreated = functions.firestore
  .document('assets/{assetId}')
  .onCreate((doc) => insertDocIntoIndex(doc))

exports.onAssetUpdated = functions.firestore
  .document('assets/{assetId}')
  .onUpdate(({ after: doc }) => insertDocIntoIndex(doc))
