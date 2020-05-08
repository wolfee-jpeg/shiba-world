import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { updateEditorFieldValue } from '../../modules/editor'
import { TextField, Button, Paper } from '@material-ui/core'
import useScryfall from '../../hooks/useScryfall'
import CardImage from '../card-image'

const getNewCardDetailsInitialState = fieldName =>
  Object.keys(allFields[fieldName].arrayOf[1]).reduce(
    (newObj, subFieldName) => ({ ...newObj, [subFieldName]: '' }),
    {}
  )

const useStyles = makeStyles({
  paper: {
    padding: '1rem 2rem',
    margin: '2rem 0'
  }
})

const AddCardForm = ({ field, saveFieldValue }) => {
  const [newCardDetails, setNewCardDetails] = useState(
    getNewCardDetailsInitialState(field.name)
  )
  const [searchTerm, setSearchTerm] = useState('')
  const responseJson = useScryfall(null, searchTerm)[2]

  const updateFieldData = (name, value) => {
    if (typeof name !== 'string') {
      setNewCardDetails({
        ...newCardDetails,
        ...name
      })
      return
    }

    setNewCardDetails({
      ...newCardDetails,
      [name]: value
    })
  }

  if (responseJson.id) {
    if (responseJson.id !== newCardDetails.scryfallCardId) {
      updateFieldData({
        cardName: responseJson.name,
        scryfallCardId: responseJson.id,
        imageUrl: responseJson.image_uris.normal
      })
    }
  }

  const onSubmit = () => {
    const invalidFields = Object.values(newCardDetails).filter(
      fieldValue => !fieldValue
    )

    if (invalidFields.length) {
      // render something
      console.error('Failed to add card to form: one or more fields are empty!')
      return
    }

    saveFieldValue(field.name, field.value.concat([newCardDetails]))
  }

  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <strong>Add Card</strong>
      <CardImage imageUrl={newCardDetails.imageUrl} />
      <TextField
        label="Card name search"
        onChange={event => setSearchTerm(event.target.value)}
        fullWidth
      />
      <TextField
        label="Ranking (1 to infinity)"
        onChange={event => updateFieldData('ranking', event.target.value)}
      />
      <TextField
        label="Reasons for rank"
        onChange={event => updateFieldData('reason', event.target.value)}
        fullWidth
        multiline
      />
      <Button variant="contained" color="primary" onClick={() => onSubmit()}>
        Add Card
      </Button>
    </Paper>
  )
}

const mapStateToProps = ({ editor: { fields } }, { fieldName }) => ({
  field: fields[fieldName]
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveFieldValue: updateEditorFieldValue
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCardForm)
