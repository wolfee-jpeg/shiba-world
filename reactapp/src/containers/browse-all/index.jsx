import React from 'react'
import useDatabase from '../../hooks/useDatabase'
import LoadingIcon from '../../components/loading'
import AssetResults from '../../components/asset-results'

export default ({
  match: {
    params: { tagName }
  }
}) => {
  const [isLoading, isErrored, results] = useDatabase(
    'assets',
    null,
    tagName
      ? {
          field: 'tags',
          operator: 'array-contains',
          value: tagName
        }
      : null
  )

  if (isLoading) {
    return <LoadingIcon />
  }

  if (isErrored) {
    return 'Error!'
  }

  return (
    <>
      <h1>Browse{tagName ? ` ${tagName}` : ''}</h1>
      {!results || !results.length ? (
        'No results'
      ) : (
        <AssetResults assets={results} />
      )}
    </>
  )
}
