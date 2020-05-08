import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FileUploader from '../file-uploader'

const Hint = ({ children }) => (
  <div style={{ fontSize: '80%', color: 'grey' }}>{children}</div>
)

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

const FileAttacherItem = ({ url, onRemove }) => (
  <Paper style={{ margin: '0 0 1rem 0', padding: '2rem' }}>
    {url}
    <br />
    <Button variant="contained" onClick={() => onRemove()}>
      Remove
    </Button>
  </Paper>
)

const FileAttacher = ({ fileUrls, onFileAttached, onFileRemoved }) => (
  <>
    {fileUrls.map(fileUrl => (
      <FileAttacherItem url={fileUrl} onRemove={() => onFileRemoved(fileUrl)} />
    ))}
    <Paper style={{ margin: '0 0 1rem 0', padding: '2rem' }}>
      <FileUploader
        directoryPath="asset-uploads"
        onDownloadUrl={url => onFileAttached(url)}
      />
    </Paper>
  </>
)

export default ({
  asset: {
    id,
    title,
    description,
    createdAt,
    createdBy,
    tags = [],
    thumbnailUrl,
    fileUrls = [],
    modifiedAt,
    modifiedBy
  } = {},
  onSubmit
}) => {
  const [fieldData, setFieldData] = useState({
    title,
    description,
    tags,
    fileUrls,
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
        value={fieldData.title}
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
        value={fieldData.thumbnailUrl}
        hint="The URL of a thumbnail."
        onChange={newVal => onFieldChange('thumbnailUrl', newVal)}
      />
      <FormField
        label="Tags"
        value={fieldData.tags.join('\n')}
        hint="A list of tags. One tag per new line."
        onChange={newVal => onFieldChange('tags', newVal)}
        convertToValidField={text => text.split('\n')}
        multiline
        rows={10}
      />
      <FileAttacher
        fileUrls={fieldData.fileUrls}
        onFileAttached={fileUrl =>
          onFieldChange('fileUrls', fieldData.fileUrls.concat([fileUrl]))
        }
        onFileRemoved={fileUrl =>
          onFieldChange(
            'fileUrls',
            fieldData.fileUrls.filter(url => url !== fileUrl)
          )
        }
      />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSubmit(fieldData)}>
        {id ? 'Save' : 'Create'}
      </Button>
    </form>
  )
}
