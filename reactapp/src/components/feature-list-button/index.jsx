import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useDatabaseDocument from '../../hooks/useDatabaseDocument'
import withEditorsOnly from '../../hocs/withEditorsOnly'
import LoadingIndicator from '../loading-indicator'

const FeatureListButton = ({ assetId, auth }) => {
  if (!auth.uid) {
    return 'Not logged in - not good'
  }

  const [isSaving, didSaveSucceedOrFail, save] = useDatabaseSave(
    'special',
    'featuredList'
  )
  const [listDocument] = useDatabaseDocument('assets', assetId)

  if (isSaving) {
    return <LoadingIndicator />
  }

  if (didSaveSucceedOrFail === true) {
    return 'List is now featured'
  }

  if (didSaveSucceedOrFail === false) {
    return 'Error featuring the list. Please try again.'
  }

  return (
    <>
      <Button
        onClick={() =>
          save({
            list: listDocument
          })
        }>
        Feature
      </Button>
    </>
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

export default withEditorsOnly(
  connect(mapStateToProps)(FeatureListButton),
  false
)
