import React from 'react'
import AssetResultsItem from '../asset-results-item'

export default ({ assets }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {assets.map(asset =>
      asset.isAdult ? null : <AssetResultsItem key={asset.id} asset={asset} />
    )}
  </div>
)
