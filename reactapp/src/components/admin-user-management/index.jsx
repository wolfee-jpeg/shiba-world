import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import useDatabase from '../../hooks/useDatabase'
import useDatabaseSave from '../../hooks/useDatabaseSave'

const ToggleFieldButton = ({ userId, fieldName, currentValue }) => {
  const [isSaving, didSaveFailOrSucceed, save] = useDatabaseSave(
    'users',
    userId
  )

  if (isSaving) {
    return 'Saving your changes...'
  }

  return (
    <>
      {didSaveFailOrSucceed === true
        ? 'Saved!'
        : didSaveFailOrSucceed === false
        ? 'Failed to save'
        : ''}
      <Button
        onClick={() =>
          save({
            [fieldName]: !currentValue
          })
        }>
        Toggle
      </Button>
    </>
  )
}

const AdminUserManagement = () => {
  const [isLoadingRecord, didLoadingRecordFail, users] = useDatabase('users')

  if (isLoadingRecord) {
    return 'Loading users...'
  }

  if (didLoadingRecordFail) {
    return 'Failed to load users. Please try again'
  }

  if (!users.length) {
    return 'Found no users'
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Is Editor</TableCell>
            <TableCell>Is Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ id, username, isEditor, isAdmin }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>
                {isEditor ? 'Y' : 'N'}
                <br />
                <ToggleFieldButton
                  userId={id}
                  currentValue={isEditor}
                  fieldName="isEditor">
                  Toggle
                </ToggleFieldButton>
              </TableCell>
              <TableCell>
                {isAdmin ? 'Y' : 'N'}
                <br />
                <ToggleFieldButton
                  userId={id}
                  currentValue={isAdmin}
                  fieldName="isAdmin">
                  Toggle
                </ToggleFieldButton>
              </TableCell>
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default AdminUserManagement
