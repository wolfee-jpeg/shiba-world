import React from 'react'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import withAuthProfile from '../../hocs/withAuthProfile'
import { trackAction, actions } from '../../analytics'
import AssetEditor from '../asset-editor'

const CreateListForm = ({ auth }) => {
  const [isSaving, isSuccess, save] = useDatabaseSave('lists')
  const userId = auth.uid

  if (isSaving) {
    return 'Creating...'
  }

  if (isSuccess) {
    return 'List created successfully!'
  }

  return (
    <AssetEditor />
  )
}

export default withAuthProfile(CreateListForm)
