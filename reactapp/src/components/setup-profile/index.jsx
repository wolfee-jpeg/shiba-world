import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import useDatabaseSave from '../../hooks/useDatabaseSave'
import useUserRecord from '../../hooks/useUserRecord'
import ErrorMessage from '../error-message'
import SuccessMessage from '../success-message'
import LoadingIndicator from '../loading-indicator'
import Button from '../button'
import Heading from '../heading'

export default () => {
  const { uid } = useSelector(({ firebase: { auth } }) => auth)
  const [, , user] = useUserRecord()
  const userId = user ? user.id : null
  const [isCreating, isCreateSuccessOrFail, create] = useDatabaseSave(
    'users',
    userId
  )
  const [fieldValue, setFieldValue] = useState('')

  // Sometimes a delay before firebase function creates their profile
  if ((uid && !userId) || user.username !== '') {
    return (
      <LoadingIndicator
        message={
          <>
            Looking up your profile...
            <br />
            <br />
            (contact Peanut if this never goes away)
          </>
        }
      />
    )
  }

  if (isCreating) {
    return <LoadingIndicator message="Setting up your profile..." />
  }

  if (isCreateSuccessOrFail === true) {
    return <SuccessMessage>Profile has been setup successfully</SuccessMessage>
  }

  if (isCreateSuccessOrFail === false) {
    return <ErrorMessage>Failed to create your profile</ErrorMessage>
  }

  return (
    <>
      <Heading variant="h1">Welcome to VRCArena</Heading>
      <p>Before you can continue please set up your profile:</p>
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
            username: fieldValue
          })
        }>
        Save
      </Button>
    </>
  )
}
