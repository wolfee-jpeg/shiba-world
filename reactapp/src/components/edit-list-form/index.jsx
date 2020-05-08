import React from 'react'
import { amber, green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import LoadingIcon from '../../components/loading'
import AssetEditor from '../asset-editor'
import useDatabase from '../../hooks/useDatabase'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import withAuthProfile from '../../hocs/withAuthProfile'
import { trackAction, actions } from '../../analytics'

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  }
}))

const EditListFormStatus = ({
  isFetching,
  didFetchFail,
  isSaving,
  didSavingFail,
  didSavingSucceed
}) => {
  const classes = useStyles()

  let isVisible = false
  let message
  let variant

  const showSnackbarIfNeeded = () => {
    isVisible = true
  }

  if (isFetching) {
    message = 'Fetching list...'
    variant = 'info'
    showSnackbarIfNeeded()
  }

  if (isSaving) {
    message = 'Saving list...'
    variant = 'info'
    showSnackbarIfNeeded()
  }

  if (didFetchFail) {
    message = 'Failed to retrieve list data. Please refresh the page'
    variant = 'error'
    showSnackbarIfNeeded()
  }

  if (didSavingFail) {
    message = 'Failed to edit the list. Please try again'
    variant = 'error'
    showSnackbarIfNeeded()
  }

  if (didSavingSucceed) {
    message = 'List edited successfully!'
    variant = 'success'
    showSnackbarIfNeeded()
  }

  if (!isVisible) {
    return null
  }

  return (
    <Snackbar open={isVisible} message={message} className={classes[variant]} />
  )
}

const EditListForm = ({ listId, auth }) => {
  const [isFetching, didFetchFail, result] = useDatabase('lists', listId)
  const [isSaving, isSuccessOrFail, save] = useDatabaseSave('lists', listId)
  const userId = auth.uid

  return (
    <>
      <EditListFormStatus
        isFetching={isFetching}
        didFetchFail={didFetchFail === true}
        isSaving={isSaving}
        didSavingSucceed={isSuccessOrFail === true}
        didSavingFail={isSuccessOrFail === false}
      />
      {isFetching ? (
        <LoadingIcon />
      ) : (
        <AssetEditor
          listId={listId}
          fieldsFromServer={result}
          saveList={async fields => {
            await save(fields)

            trackAction(actions.EDIT_LIST, {
              listId,
              userId
            })
          }}
        />
      )}
    </>
  )
}

export default withAuthProfile(EditListForm)
