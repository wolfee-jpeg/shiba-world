import React from 'react'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withAuthProfile from '../../hocs/withAuthProfile'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../../components/loading-indicator'
import ErrorMessage from '../../components/error-message'
import CreateProfileForm from '../../components/create-profile-form'
import UsernameEditor from '../../components/username-editor'
import AdultContentToggle from '../../components/adult-content-toggle'

const MyAccount = ({ auth }) => {
  const [isLoading, isErrored, user] = useDatabase('users', auth.uid)

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (isErrored) {
    return <ErrorMessage>Failed to retrieve your account details</ErrorMessage>
  }

  if (!user) {
    return (
      <>
        <h1>Welcome to VRCArena</h1>
        <p>
          Thanks for signing up. Before you can start uploading assets and
          interacting with the site, you need to be approved by an admin.
        </p>
        <h2>Step One</h2>
        <p>Enter your profile info to get started:</p>
        <CreateProfileForm userId={auth.uid} />
        <h2>Step Two</h2>
        <p>
          To gain permission please message PeanutBuddha on Discord: Peanut#1756
        </p>
      </>
    )
  }

  return (
    <>
      <h1>Your Account</h1>
      <p>Hi, {user.username}!</p>
      <h2>Change your name</h2>
      <UsernameEditor userId={user.id} record={user} />
      <h2>Profile settings</h2>
      <AdultContentToggle />
    </>
  )
}

export default withRedirectOnNotAuth(withAuthProfile(MyAccount))
