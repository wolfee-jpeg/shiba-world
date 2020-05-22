import React from 'react'
import { connect } from 'react-redux'
import useDatabase from '../../hooks/useDatabase'
import CreateProfileForm from '../create-profile-form'
import UsernameEditor from '../username-editor'
import Heading from '../heading'

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

const AccountSummary = ({ auth }) => {
  if (!auth.uid) {
    return 'Not logged in - HOC should have redirected you'
  }

  const [isLoadingRecord, didLoadingRecordFail, record] = useDatabase(
    'users',
    auth.uid
  )

  if (isLoadingRecord) {
    return 'Loading your details...'
  }

  if (didLoadingRecordFail) {
    return 'Failed to load your details. Please try again'
  }

  if (!record) {
    return <CreateProfileForm userId={auth.uid} />
  }

  return (
    <>
      Hi, {record.username}!<Heading variant="h2">Change your name</Heading>
      <UsernameEditor userId={record.id} record={record} />
    </>
  )
}

export default connect(mapStateToProps)(AccountSummary)
