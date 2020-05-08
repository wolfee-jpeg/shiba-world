import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import useDatabaseSave from '../../hooks/useDatabaseSave'

const CreateProfileForm = ({ userId }) => {
  if (!userId) {
    return 'Need user ID to create profile'
  }

  const [isCreating, isCreateSuccessOrFail, create] = useDatabaseSave(
    'users',
    userId
  )
  const [fieldValue, setFieldValue] = useState('')

  if (isCreating) {
    return 'Creating your profile...'
  }

  if (isCreateSuccessOrFail === true) {
    return 'Profile has been created successfully'
  }

  if (isCreateSuccessOrFail === false) {
    return 'Failed to create your profile. Probably a connection or permissions error'
  }

  return (
    <>
      Your profile does not exist. You need a profile before you can become an
      editor that can create lists and comment on other lists. Please enter your
      name below and click Create to get started:
      <br />
      <TextField
        value={fieldValue}
        onChange={event => setFieldValue(event.target.value)}
      />
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
