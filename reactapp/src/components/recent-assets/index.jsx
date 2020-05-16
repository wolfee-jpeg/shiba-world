import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'
import AssetResults from '../asset-results'
import ErrorMessage from '../error-message'

const useStyles = makeStyles(() => ({
  title: { margin: '3rem 0', fontSize: '2rem', fontWeight: 'bold' }
}))

export default () => {
  const [isFetching, isErrored, assets] = useDatabase('assets')
  const classes = useStyles()

  if (isFetching) {
    return <LoadingIndicator />
  }

  if (isErrored) {
    return <ErrorMessage>Failed to get the assets</ErrorMessage>
  }

  return (
    <>
      <Typography variant="h1" className={classes.title}>
        Recent Assets
      </Typography>
      <AssetResults assets={assets} />
    </>
  )
}
