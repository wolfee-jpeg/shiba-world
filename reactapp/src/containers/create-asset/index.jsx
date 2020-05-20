import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import withAuthProfile from '../../hocs/withAuthProfile'
import AssetEditor from '../../components/asset-editor'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import LoadingIndicator from '../../components/loading-indicator'
import SuccessMessage from '../../components/success-message'
import { scrollToTop } from '../../utils'
import * as routes from '../../routes'

const CreateAsset = ({ auth }) => {
  const [isSaving, isSuccess, save] = useDatabaseSave('assets')
  const userId = auth.uid
  const [userDocument] = useDatabaseDocument('users', userId)
  const [newDocumentId, setNewDocumentId] = useState(null)

  if (isSaving) {
    return <LoadingIndicator message="Creating..." />
  }

  if (isSuccess) {
    return (
      <SuccessMessage>
        Asset created successfully <br />
        <Link to={routes.viewAssetWithVar.replace(':assetId', newDocumentId)}>
          <Button variant="contained">View Asset</Button>
        </Link>
      </SuccessMessage>
    )
  }

  return (
    <>
      <h1>Upload Asset</h1>
      <AssetEditor
        onSubmit={async newFields => {
          scrollToTop()

          try {
            const [docId] = await save({
              ...newFields,
              isApproved: false,
              createdAt: new Date(),
              createdBy: userDocument
            })
            setNewDocumentId(docId)
          } catch (err) {
            console.error(err)
          }
        }}
      />
    </>
  )
}

export default withRedirectOnNotAuth(withAuthProfile(CreateAsset))
