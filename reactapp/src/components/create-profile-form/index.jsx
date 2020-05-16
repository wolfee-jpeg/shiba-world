import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import ErrorMessage from '../error-message'
import SuccessMessage from '../success-message'
import LoadingIndicator from '../loading-indicator'
import { FormControl } from '@material-ui/core'

const CreateProfileForm = ({ userId }) => {
  if (!userId) {
    return <ErrorMessage>Need user ID to create profile</ErrorMessage>
  }

  const [isCreating, isCreateSuccessOrFail, create] = useDatabaseSave(
    'users',
    userId
  )
  const [fieldValue, setFieldValue] = useState('')

  if (isCreating) {
    return <LoadingIndicator message="Creating your profile..." />
  }

  if (isCreateSuccessOrFail === true) {
    return (
      <SuccessMessage>Profile has been created successfully</SuccessMessage>
    )
  }

  if (isCreateSuccessOrFail === false) {
    return <ErrorMessage>Failed to create your profile</ErrorMessage>
  }

  return (
    <>
      <FormControl>
        <TextField
          value={fieldValue}
          label="Username"
          onChange={event => setFieldValue(event.target.value)}
        />
      </FormControl>
      <Button
        onClick={() =>
          create({
            username: fieldValue,
            isEditor: false, // TODO: Define these under Resources like list
            isAdmin: false
          })
        }>
        Create
      </Button>
    </>
  )
}

export default CreateProfileForm
