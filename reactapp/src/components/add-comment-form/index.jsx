import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import { trackAction, actions } from '../../analytics'
import useUserRecord from '../../hooks/useUserRecord'
import { CollectionNames } from '../../hooks/useDatabaseQuery'
import ErrorMessage from '../error-message'
import SuccessMessage from '../success-message'
import LoadingIndicator from '../loading-indicator'

export default ({ assetId }) => {
  if (!assetId) {
    throw new Error('No asset ID provided')
  }

  const [textFieldValue, setTextFieldValue] = useState('')
  const [, , user] = useUserRecord()
  const [isSaving, didSaveSucceedOrFail, save] = useDatabaseSave(
    CollectionNames.Comments
  )
  const [userDocument] = useDatabaseDocument(
    CollectionNames.Users,
    user && user.id
  )
  const [assetDocument] = useDatabaseDocument(CollectionNames.Assets, assetId)

  if (!user) {
    return null
  }

  if (isSaving) {
    return <LoadingIndicator>Adding your comment...</LoadingIndicator>
  }

  if (didSaveSucceedOrFail === true) {
    return <SuccessMessage>Added your comment successfully</SuccessMessage>
  }

  if (didSaveSucceedOrFail === false) {
    return (
      <ErrorMessage>Error adding your comment. Please try again.</ErrorMessage>
    )
  }

  return (
    <>
      <TextField
        multiline
        value={textFieldValue}
        onChange={event => setTextFieldValue(event.target.value)}
      />
      <br />
      <Button
        onClick={async () => {
          const [documentId] = await save({
            parent: assetDocument,
            comment: textFieldValue,
            createdBy: userDocument,
            createdAt: new Date()
          })

          trackAction(actions.COMMENT_ON_ASSET, {
            assetId: documentId,
            userId: user.id
          })
        }}>
        Add
      </Button>
    </>
  )
}
