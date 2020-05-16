import React, { useState } from 'react'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import withAuthProfile from '../../hocs/withAuthProfile'
import AssetEditor from '../../components/asset-editor'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withEditorsOnly from '../../hocs/withEditorsOnly'
import LoadingIndicator from '../../components/loading-indicator'
import SuccessMessage from '../../components/success-message'

const requiredFields = ['title', 'description', 'thumbnailUrl']

const CreateAsset = ({ auth }) => {
  const [invalidFieldName, setInvalidFieldName] = useState('')
  const [isSaving, isSuccess, save] = useDatabaseSave('assets')
  const userId = auth.uid
  const [userDocument] = useDatabaseDocument('users', userId)

  if (isSaving) {
    return <LoadingIndicator message="Creating..." />
  }

  if (isSuccess) {
    return <SuccessMessage>Asset created successfully</SuccessMessage>
  }

  return (
    <>
      <h1>Upload Asset</h1>
      {invalidFieldName && `Field ${invalidFieldName} is invalid!`}
      <AssetEditor
        onSubmit={newFields => {
          for (const fieldName of requiredFields) {
            if (!newFields[fieldName]) {
              setInvalidFieldName(fieldName)
              return
            }
          }

          save({ ...newFields, createdAt: new Date(), createdBy: userDocument })
        }}
      />
    </>
  )
}

export default withRedirectOnNotAuth(
  withEditorsOnly(withAuthProfile(CreateAsset))
)
