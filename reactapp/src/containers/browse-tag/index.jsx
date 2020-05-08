import React from 'react'
import useDatabase from '../../hooks/useDatabase'
import LoadingIcon from '../../components/loading'
import AssetResults from '../../components/asset-results'

export default ({
  match: {
    params: { tagName }
  }
}) => {
  const [isLoading, isErrored, results] = useDatabase('assets', null, {
    field: 'tags',
    operator: 'array-contains',
    value: tagName
  })

  if (isLoading) {
    return <LoadingIcon />
  }

  if (isErrored) {
    return 'Error!'
  }

  console.log(results)

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
