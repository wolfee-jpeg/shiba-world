const initialState = {
  listId: '',
  fields: {}
}

const setFieldValueInFields = (fields, name, value) => ({
  ...fields,
  [name]: {
    ...fields[name],
    value
  }
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_FIELD_VALUE:
      return {
        ...state,
        fields: setFieldValueInFields(
          state.fields,
          action.payload.name,
          action.payload.value
        )
      }

    case POPULATE_EDITOR:
      return {
        ...state,
        fields: action.payload.fields
      }

    default:
      return state
  }
}

// ACTIONS

const UPDATE_EDITOR_FIELD_VALUE = 'UPDATE_EDITOR_FIELD_VALUE'
export const updateEditorFieldValue = (name, value) => ({
  type: UPDATE_EDITOR_FIELD_VALUE,
  payload: {
    name,
    value
  }
})

const POPULATE_EDITOR = 'POPULATE_EDITOR'
export const populateEditor = fields => ({
  type: POPULATE_EDITOR,
  payload: {
    fields
  }
})

export const publishEditorChanges = () => (dispatch, getState) => {
  if (getState().editor.listId) {
    alert('Creating list...')
  } else {
    alert('Editing list...')
  }
}
