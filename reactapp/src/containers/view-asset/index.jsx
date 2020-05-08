import React from 'react'
import AssetOverview from '../../components/asset-overview'

const ViewList = ({ match: { params } }) => (
  <>
    <AssetOverview assetId={params.assetId} />
  </>
)

export default ViewList
