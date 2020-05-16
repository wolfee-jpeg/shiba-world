import React from 'react'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import withAuthProfile from '../../hocs/withAuthProfile'
import AssetEditor from '../../components/asset-editor'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withEditorsOnly from '../../hocs/withEditorsOnly'
import LoadingIndicator from '../../components/loading-indicator'
import SuccessMessage from '../../components/success-message'
import { scrollToTop } from '../../utils'

const CreateAsset = ({ auth }) => {
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
      <AssetEditor
        onSubmit={newFields => {
          scrollToTop()
          save({ ...newFields, createdAt: new Date(), createdBy: userDocument })
        }}
      />
    </>
  )
}

export default withRedirectOnNotAuth(
  withEditorsOnly(withAuthProfile(CreateAsset))
)
