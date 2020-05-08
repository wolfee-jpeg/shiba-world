import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

const Hint = ({ children }) => <div>{children}</div>

const FormField = ({
  label,
  value,
  hint,
  convertToValidField,
  onChange,
  ...textFieldProps
}) => (
  <Paper style={{ margin: '0 0 1rem 0', padding: '2rem' }}>
    <FormControl fullWidth>
      <TextField
        label={label}
        defaultValue={value || ''}
        onChange={event =>
          onChange(
            convertToValidField
              ? convertToValidField(event.target.value)
              : event.target.value
          )
        }
        {...textFieldProps}
      />
      <Hint>{hint}</Hint>
    </FormControl>
  </Paper>
)

export default ({
  asset: {
    title,
    description,
    createdAt,
    createdBy,
    tags,
    thumbnailUrl,
    modifiedAt,
    modifiedBy
  } = {},
  onSubmit
}) => {
  const [fieldData, setFieldData] = useState({
    title,
    description,
    tags,
    thumbnailUrl
  })

  const onFieldChange = (fieldName, newVal) => {
    setFieldData({
      ...fieldData,
      [fieldName]: newVal
    })
  }

  return (
    <form>
      <FormField
        label="Title"
        value={title}
        hint="The name of the asset."
        onChange={newVal => onFieldChange('title', newVal)}
      />
      <FormField
        label="Description"
        value={description || ''}
        hint="A short paragraph that describes the asset."
        onChange={newVal => onFieldChange('description', newVal)}
        multiline
        rows={10}
      />
      <FormField
        label="Thumbnail URL"
        value={thumbnailUrl || ''}
        hint="The URL of a thumbnail."
        onChange={newVal => onFieldChange('thumbnailUrl', newVal)}
      />
      <FormField
        label="Tags"
        value={tags || ''}
        hint="A list of tags. One tag per new line."
        onChange={newVal => onFieldChange('tags', newVal)}
        convertToValidField={text => text.split('\n')}
        multiline
        rows={10}
      />
      <Button onClick={() => onSubmit(fieldData)}>Save</Button>
    </form>
  )
}
