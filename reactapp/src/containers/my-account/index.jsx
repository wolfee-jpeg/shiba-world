import React from 'react'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withAuthProfile from '../../hocs/withAuthProfile'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../../components/loading-indicator'
import ErrorMessage from '../../components/error-message'
import CreateProfileForm from '../../components/create-profile-form'
import UsernameEditor from '../../components/username-editor'
import AdultContentToggle from '../../components/adult-content-toggle'
import Heading from '../../components/heading'

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
        <Heading variant="h1">Welcome to VRCArena</Heading>
        <p>
          Thanks for signing up. Before you can start uploading assets and
          interacting with the site, you need a profile.
        </p>
        <p>Enter your profile info to get started:</p>
        <CreateProfileForm userId={auth.uid} />
        <p>Once done you can start uploading assets from the main menu.</p>
      </>
    )
  }

  return (
    <>
      <Heading variant="h1">Your Account</Heading>
      <p>Hi, {user.username}!</p>
      <Heading variant="h2">Change your name</Heading>
      <UsernameEditor userId={user.id} record={user} />
      <Heading variant="h2">Profile settings</Heading>
      <AdultContentToggle />
    </>
  )
}

export default withRedirectOnNotAuth(withAuthProfile(MyAccount))
