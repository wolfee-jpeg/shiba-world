import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AssetEditor from '../../components/asset-editor'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withEditorsOnly from '../../hocs/withEditorsOnly'
import useDatabase from '../../hooks/useDatabase'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import LoadingIndicator from '../../components/loading-indicator'
import ErrorMessage from '../../components/error-message'
import SuccessMessage from '../../components/success-message'
import { scrollToTop } from '../../utils'
import * as routes from '../../routes'

const EditAsset = ({ match: { params } }) => {
  const [isLoading, isErrored, asset] = useDatabase('assets', params.assetId)
  const [newFields, setNewFields] = useState()
  const [isSaving, wasSaveSuccessOrFail, save] = useDatabaseSave(
    'assets',
    params.assetId
  )

  return (
    <>
      <h1>Edit Asset</h1>
      {wasSaveSuccessOrFail === true && (
        <SuccessMessage>
          Save success
          <br />
          <Link
            to={routes.viewAssetWithVar.replace(':assetId', params.assetId)}>
            <Button variant="contained">View Asset</Button>
          </Link>
        </SuccessMessage>
      )}
      {isLoading || isSaving ? (
        <LoadingIndicator />
      ) : isErrored || !asset ? (
        <ErrorMessage>Failed to load the asset for editing</ErrorMessage>
      ) : wasSaveSuccessOrFail === false ? (
        <ErrorMessage>Failed to edit the asset</ErrorMessage>
      ) : (
        <AssetEditor
          assetId={params.assetId}
          asset={newFields ? newFields : asset}
          onSubmit={fields => {
            scrollToTop()
            save(fields)
            setNewFields(fields)
          }}
        />
      )}
    </>
  )
}

export default withRedirectOnNotAuth(withEditorsOnly(EditAsset))
