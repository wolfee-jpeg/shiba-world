import React from 'react'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'
import { Typography } from '@material-ui/core'
import AssetResults from '../asset-results'

const FeaturedList = () => {
  const [isFetching, isErrored, assets] = useDatabase(
    'assets'
  )

  if (isFetching) {
    return <LoadingIndicator />
  }

  if (isErrored) {
    return 'Failed to get recent assets!'
  }

  return (
    <>
      <Typography
        variant="h1"
        style={{ margin: '3rem 0', fontSize: '2rem', fontWeight: 'bold' }}>
        Recent Assets
      </Typography>
      <AssetResults assets={assets} />
    </>
  )
}

export default FeaturedList
