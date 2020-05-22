import React from 'react'
import Comment from '../comment'
import LoadingIndicator from '../loading-indicator'
import useDatabaseQuery, {
  CollectionNames,
  CommentFieldNames,
  Operators
} from '../../hooks/useDatabaseQuery'
import ErrorMessage from '../error-message'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'

export default ({ assetId }) => {
  if (!assetId) {
    throw new Error('Cannot render comment list: no asset ID')
  }

  const [parentDoc] = useDatabaseDocument(CollectionNames.Assets, assetId)
  const [isLoading, isErrored, comments] = useDatabaseQuery(
    CollectionNames.Comments,
    [[CommentFieldNames.parent, Operators.EQUALS, parentDoc]]
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (isErrored) {
    return <ErrorMessage>Failed to load comments</ErrorMessage>
  }

  if (!comments.length) {
    return 'No comments found :('
  }

  return (
    <>
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
    </>
  )
}
