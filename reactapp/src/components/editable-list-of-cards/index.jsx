import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEditorFieldValue } from '../../modules/editor'
import EditCardForm from '../edit-card-form'
import AddCardForm from '../add-card-form'

const EditableListOfCards = ({ field, saveFieldValue }) =>
  !field ? (
    'Waiting for field...'
  ) : (
    <>
      {field.value
        .sort(
          ({ ranking: rankingA }, { ranking: rankingB }) => rankingA - rankingB
        )
        .map(card => (
          <EditCardForm
            key={card.scryfallCardId}
            {...card}
            onChangeCardDetail={(fieldName, fieldValue) =>
              saveFieldValue(
                field.name,
                field.value.map(cardUnderTest => {
                  if (cardUnderTest.scryfallCardId === card.scryfallCardId) {
                    return {
                      ...cardUnderTest,
                      [fieldName]: fieldValue
                    }
                  }
                  return cardUnderTest
                })
              )
            }
            onRemoveCard={cardDetails =>
              saveFieldValue(
                field.name,
                field.value.filter(cardUnderTest => {
                  if (
                    cardUnderTest.scryfallCardId === cardDetails.scryfallCardId
                  ) {
                    return false
                  }
                  return true
                })
              )
            }
          />
        ))}
      <AddCardForm fieldName={field.name} />
    </>
  )

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
)(EditableListOfCards)
