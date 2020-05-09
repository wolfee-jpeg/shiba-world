import React from 'react'
import AssetEditor from '../../components/asset-editor'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withEditorsOnly from '../../hocs/withEditorsOnly'
import useDatabase from '../../hooks/useDatabase'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import LoadingIndicator from '../../components/loading'
import { useState } from 'react'

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
        <div style={{ padding: '2rem', textAlign: 'center' }}>Save success</div>
      )}
      {isLoading || isSaving ? (
        <LoadingIndicator />
      ) : isErrored || !asset || wasSaveSuccessOrFail === false ? (
        'Error!'
      ) : (
        <AssetEditor
          assetId={params.assetId}
          asset={newFields ? newFields : asset}
          onSubmit={fields => {
            save(fields)
            setNewFields(fields)
          }}
        />
      )}
    </>
  )
}

export default withRedirectOnNotAuth(withEditorsOnly(EditAsset))
