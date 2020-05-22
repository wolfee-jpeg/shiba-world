import useDatabaseQuery, { CollectionNames } from './useDatabaseQuery'
import useFirebaseUserId from './useFirebaseUserId'

export default () => {
  const uid = useFirebaseUserId()

  const [isLoading, isErrored, user] = useDatabaseQuery(
    CollectionNames.Users,
    uid ? uid : false
  )

  return [isLoading, isErrored, uid ? user : null]
}
