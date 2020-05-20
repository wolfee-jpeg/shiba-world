import React from 'react'
import AssetResultsItem from '../asset-results-item'

export default ({ assets, showPrimaryTag }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {assets.map(asset => (
      <AssetResultsItem
        key={asset.id}
        asset={asset}
        showPrimaryTag={showPrimaryTag}
      />
    ))}
  </div>
)
