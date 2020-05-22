import { inDevelopment } from './environment'

const categories = {
  ROUTING: 'Routing',
  AUTH: 'Auth',
  LISTS: 'Lists'
}

export const actions = {
  // APP
  NAVIGATE: 'Navigate',
  OPEN_NAV_MENU: 'OpenNavMenu',
  CLOSE_NAV_MENU: 'CloseNavMenu',

  // AUTH
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  SIGNUP: 'SignUp',
  CHANGE_USERNAME: 'ChangeUsername',

  // SEARCH
  FOCUS_SEARCH: 'FocusSearch',
  CHANGE_SEARCH_TERM: 'ChangeSearchTerm',

  // LISTS
  CREATE_LIST: 'CreateList',
  EDIT_LIST: 'EditList',
  VOTE_ON_LIST: 'VoteOnList',
  COMMENT_ON_LIST: 'CommentOnList',

  TOGGLE_ENABLED_ADULT_CONTENT: 'ToggleEnabledAdultContent'
}

const actionDetails = {
  // ROUTING

  [actions.NAVIGATE]: {
    category: categories.ROUTING
  },
  [actions.OPEN_NAV_MENU]: {
    category: categories.ROUTING
  },
  [actions.CLOSE_NAV_MENU]: {
    category: categories.ROUTING
  },

  // AUTH

  [actions.LOGIN]: {
    category: categories.AUTH
  },
  [actions.LOGOUT]: {
    category: categories.AUTH
  },
  [actions.SIGNUP]: {
    category: categories.AUTH
  },
  [actions.CHANGE_USERNAME]: {
    category: categories.AUTH
  },

  // SEARCH

  [actions.FOCUS_SEARCH]: {
    category: categories.LISTS
  },
  [actions.CHANGE_SEARCH_TERM]: {
    category: categories.LISTS
  },

  // LISTS

  [actions.CREATE_LIST]: {
    category: categories.LISTS
  },
  [actions.EDIT_LIST]: {
    category: categories.LISTS
  },
  [actions.COMMENT_ON_LIST]: {
    category: categories.LISTS
  },
  [actions.VOTE_ON_LIST]: {
    category: categories.LISTS
  }
}

export const trackAction = (name, payload) => {
  if (inDevelopment()) {
    return
  }

  const { category } = actionDetails[name]

  window.gtag('event', name, {
    event_category: category,
    event_label: JSON.stringify(payload)
  })
}
