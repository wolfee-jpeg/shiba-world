import React from 'react'
import SingleListView from '../../components/single-list-view'

const ViewList = ({ match: { params } }) => (
  <>
    <SingleListView assetId={params.assetId} />
  </>
)

export default ViewList
