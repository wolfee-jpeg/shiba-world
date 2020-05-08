import withUserFlagOnly from './withUserFlagOnly'

export default (Component, showMustLoginMessage) =>
  withUserFlagOnly(Component, 'isEditor', showMustLoginMessage)
