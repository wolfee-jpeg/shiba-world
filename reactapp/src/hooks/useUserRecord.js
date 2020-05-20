import { useSelector } from 'react-redux'
import useDatabaseQuery, { CollectionNames } from './useDatabaseQuery'

export default () => {
  const { uid } = useSelector(({ firebase: { auth } }) => auth)

  const [isLoading, isErrored, user] = useDatabaseQuery(
    CollectionNames.Users,
    uid ? uid : false
  )

  return [isLoading, isErrored, uid ? user : null]
}
