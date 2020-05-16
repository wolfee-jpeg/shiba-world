import React, { useState, Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FileUploader from '../file-uploader'
import tagList from '../../tags'

const Hint = ({ children }) => (
  <div style={{ fontSize: '80%', color: 'grey' }}>{children}</div>
)

const FormField = ({
  label,
  type = 'text',
  value,
  hint,
  convertToValidField,
  onChange,
  ...textFieldProps
}) => (
  <Paper style={{ margin: '0 0 1rem 0', padding: '2rem' }}>
    <FormControl fullWidth>
      {type === 'text' ? (
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
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={event => onChange(event.target.checked)}
            />
          }
          label={label}
        />
      )}
      <Hint>
        {hint.split('\n').map((hint, idx) => (
          <Fragment key={hint}>
            {idx !== 0 && <br />}
            {hint}
          </Fragment>
        ))}
      </Hint>
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
      <FileAttacherItem
        key={fileUrl}
        url={fileUrl}
        onRemove={() => onFileRemoved(fileUrl)}
      />
    ))}
    <Paper style={{ margin: '0 0 1rem 0', padding: '2rem' }}>
      <FileUploader
        directoryPath="asset-uploads"
        onDownloadUrl={url => onFileAttached(url)}
      />
    </Paper>
  </>
)

const isFormValid = (formFields, doesHavePermission) => {
  if (!formFields.title) {
    return false
  }
  if (!formFields.description) {
    return false
  }
  if (!formFields.thumbnailUrl) {
    return false
  }
  if (!doesHavePermission) {
    return false
  }
  return true
}

export default ({
  assetId,
  asset: { title, description, tags = [], thumbnailUrl, fileUrls = [] } = {},
  onSubmit
}) => {
  const [fieldData, setFieldData] = useState({
    title,
    description,
    tags,
    fileUrls,
    thumbnailUrl
  })
  const [doesHavePermission, setDoesHavePermission] = useState(false)

  const onFieldChange = (fieldName, newVal) => {
    setFieldData({
      ...fieldData,
      [fieldName]: newVal
    })
  }

  const onFormSubmitted = () => {
    if (!doesHavePermission) {
      return
    }
    onSubmit(fieldData)
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
        hint="The URL of a thumbnail. Use the file upload form below to upload a new file."
        onChange={newVal => onFieldChange('thumbnailUrl', newVal)}
      />
      <FormField
        label="Tags"
        value={fieldData.tags.join('\n')}
        hint={`A list of tags (one per line) to describe your asset.
Used for categories. Categories: ${Object.values(tagList).join(', ')}.
Your asset can belong to multiple categories.
Eg. for collar tag it "collar", if it is colored blue tag it "blue", etc.`}
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
      <FormField
        label="I have permission to upload this asset"
        type="checkbox"
        value={doesHavePermission}
        hint="We don't want to steal content. If you want to share someone else's work, please link directly to their website or Discord message (not the file itself)."
        onChange={newVal => setDoesHavePermission(newVal)}
      />
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onFormSubmitted}
          disabled={!isFormValid(fieldData, doesHavePermission)}>
          {assetId ? 'Save' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
