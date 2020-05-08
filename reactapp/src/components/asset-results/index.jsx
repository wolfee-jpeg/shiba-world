import React from 'react'
import AssetResultsItem from '../asset-results-item'

export default ({ assets }) => (
  <>
    {assets.map(asset => (
      <AssetResultsItem key={asset.id} asset={asset} />
    ))}
  </>
)
