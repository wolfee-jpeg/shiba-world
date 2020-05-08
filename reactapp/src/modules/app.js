import { trackAction, actions } from '../analytics'

const initialState = {
  isMenuOpen: false,
  searchTerm: ''
}

const OPEN_MENU = 'OPEN_MENU'
const CLOSE_MENU = 'CLOSE_MENU'
const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM'

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU:
      return {
        ...state,
        isMenuOpen: true
      }

    case CLOSE_MENU:
      return {
        ...state,
        isMenuOpen: false
      }

    case CHANGE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      }

    default:
      return state
  }
}

// ACTIONS

export const openMenu = () => dispatch => {
  dispatch({
    type: OPEN_MENU
  })

  trackAction(actions.OPEN_NAV_MENU)
}

export const closeMenu = () => dispatch => {
  dispatch({
    type: CLOSE_MENU
  })

  trackAction(actions.CLOSE_NAV_MENU)
}

export const changeSearchTerm = searchTerm => dispatch => {
  dispatch({
    type: CHANGE_SEARCH_TERM,
    payload: {
      searchTerm
    }
  })

  if (!searchTerm) {
    return
  }

  trackAction(actions.CHANGE_SEARCH_TERM, {
    searchTerm
  })
}
