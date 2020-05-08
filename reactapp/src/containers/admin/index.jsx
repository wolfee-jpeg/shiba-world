import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withAdminsOnly from '../../hocs/withAdminsOnly'
import useDatabaseBackup from '../../hooks/useDatabaseBackup'
import useDatabaseRestore from '../../hooks/useDatabaseRestore'
import AdminUserManagement from '../../components/admin-user-management'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

const AdminInfo = connect(mapStateToProps)(({ auth }) => {
  if (!auth) {
    return 'Waiting for auth to provide your details...'
  }

  const { uid } = auth

  return (
    <ul>
      <li>User ID: {uid}</li>
    </ul>
  )
})

const DatabaseBackup = () => {
  const [textFieldValue, setTextFieldValue] = useState('lists')
  const [collectionName, setCollectionName] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [isFetching, isErrored, isSuccess, result] = useDatabaseBackup(
    collectionName
  )

  if (isFetching) {
    return 'Backing up collection...'
  }

  if (isErrored) {
    return 'Error backing up collection! Check console'
  }

  return (
    <>
      <TextField
        label="Collection name (eg. lists)"
        value={textFieldValue || ''}
        onChange={event => setTextFieldValue(event.target.value)}
      />
      <br />
      Backup data:
      <br />
      <textarea value={result ? JSON.stringify(result) : ''} readOnly />
      <br />
      <Button onClick={() => setCollectionName(textFieldValue)}>
        Perform Backup
      </Button>
    </>
  )
}

const DatabaseRestore = () => {
  const [textFieldValue, setTextFieldValue] = useState('lists')
  const [databaseRestoreValue, setDatabaseRestoreValue] = useState(null)
  const [collectionName, setCollectionName] = useState('')
  const [isFetching, isErrored, isSuccess] = useDatabaseRestore(
    collectionName,
    databaseRestoreValue
  )

  if (isFetching) {
    return 'Restoring collection...'
  }

  if (isErrored) {
    return 'Error restoring collection! Check console'
  }

  if (isSuccess) {
    return 'Database restored successfully'
  }

  return (
    <>
      <TextField
        label="Collection name (eg. lists)"
        value={textFieldValue || ''}
        onChange={event => setTextFieldValue(event.target.value)}
      />
      <br />
      Data to restore:
      <br />
      <textarea
        onChange={event => setDatabaseRestoreValue(event.target.value)}
      />
      <br />
      <Button onClick={() => setCollectionName(textFieldValue)}>
        Perform Restore
      </Button>
      <br />
      Warning: This operation is permanent and cannot be reverted
    </>
  )
}

const Admin = () => (
  <>
    <h1>Admin</h1>
    <hr />
    <AdminInfo />
    <hr />
    <h2>Database Backup</h2>
    <DatabaseBackup />
    <hr />
    <h2>Database Restore</h2>
    <DatabaseRestore />
    <hr />
    <h2>Admin User Management</h2>
    <AdminUserManagement />
  </>
)

export default connect(null)(withRedirectOnNotAuth(withAdminsOnly(Admin)))
