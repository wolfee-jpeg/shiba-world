import React from 'react'
import AssetOverview from '../asset-overview'
import useDatabase from '../../hooks/useDatabase'
import LoadingIndicator from '../loading'
import { Typography } from '@material-ui/core'

export default () => {
  const [isFetching, isErrored, featuredAsset] = useDatabase(
    'special',
    'featuredAsset',
    null,
    false // disable refs
  )

  if (isFetching) {
    return <LoadingIndicator />
  }

  if (isErrored || !featuredAsset || !featuredAsset.asset) {
    return 'Failed to get featured asset!'
  }

  const {
    asset: { id: assetId }
  } = featuredAsset

  return (
    <>
      <Typography
        variant="h1"
        style={{ margin: '3rem 0', fontSize: '2rem', fontWeight: 'bold' }}>
        Featured Asset
      </Typography>
      <AssetOverview assetId={assetId} small />
    </>
  )
}
