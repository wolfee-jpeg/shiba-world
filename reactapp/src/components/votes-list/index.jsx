import React from 'react'
import useDatabase from '../../hooks/useDatabase'

const VotesList = ({ listId }) => {
  const [isLoading, isErrored, votes] = useDatabase('votes', null, {
    field: 'list',
    operator: '==',
    reference: {
      collection: 'lists',
      id: listId
    }
  })

  if (isLoading) {
    return 'Getting votes for the list...'
  }

  if (isErrored) {
    return 'Failed to get votes for list'
  }

  if (!votes.length) {
    return 'Found no votes for this list'
  }

  return (
    <ul>
      {votes.map(({ id, createdBy: { username }, vote }) => (
        <li key={id}>
          User <strong>{username}</strong> voted {vote}/10
        </li>
      ))}
    </ul>
  )
}

export default VotesList
