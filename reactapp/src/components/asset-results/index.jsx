import React from 'react'
import AssetResultsItem from '../asset-results-item'

export default ({ assets }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {assets.map(asset => (
      <AssetResultsItem key={asset.id} asset={asset} />
    ))}
  </div>
)
