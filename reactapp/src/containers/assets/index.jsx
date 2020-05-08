import React from 'react'
import useDatabase from '../../hooks/useDatabase'
import LoadingIcon from '../../components/loading'
import AssetResults from '../../components/asset-results'

const Lists = () => {
  const [isLoading, isErrored, results] = useDatabase('assets')

  if (isLoading) {
    return <LoadingIcon />
  }

  if (isErrored) {
    return 'Error!'
  }

  return <AssetResults assets={results} />
}

export default Lists
