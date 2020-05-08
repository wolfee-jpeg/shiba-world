import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { DropzoneArea } from 'material-ui-dropzone'
import useFileUpload from '../../hooks/useFileUpload'

export default ({ directoryPath = '', onDownloadUrl }) => {
  const uploadedFileRef = useRef()
  const [
    isUploading,
    percentageDone,
    downloadUrl,
    isSuccess,
    upload
  ] = useFileUpload()

  const onDropzoneAreaChange = files => {
    uploadedFileRef.current = files[0]
  }

  const onUploadClick = async () => {
    if (!uploadedFileRef.current) {
      console.error('No file selected!!!')
    }

    try {
      const url = await upload(
        uploadedFileRef.current,
        `${directoryPath}/${uploadedFileRef.current.name}`
      )

      onDownloadUrl(url)
    } catch (err) {
      console.error(err)
    }
  }

  if (isUploading) {
    return `Uploading ${percentageDone}%`
  }

  if (isSuccess) {
    return `Upload uploaded successfully`
  }

  return (
    <>
      <DropzoneArea
        onChange={onDropzoneAreaChange}
        filesLimit={1}
        // acceptedFiles={['image/jpg, image/jpeg, image/png']}
        maxFileSize={50 * 1000 * 1000}
      />
      Max size 50mb
      <br />
      <Button variant="contained" onClick={onUploadClick}>
        Upload
      </Button>
    </>
  )
}
