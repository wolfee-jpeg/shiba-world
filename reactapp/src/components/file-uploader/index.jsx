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

  const onUploadAnotherClick = () => {
    uploadedFileRef.current = null
  }

  if (uploadedFileRef.current && isUploading) {
    return `Uploading ${percentageDone}%`
  }

  // if (uploadedFileRef.current && isSuccess) {
  //   return (
  //     <>
  //       Asset uploaded successfully.{' '}
  //       <Button onClick={onUploadAnotherClick}>Upload Another</Button>
  //     </>
  //   )
  // }

  return (
    <>
      <DropzoneArea
        onChange={onDropzoneAreaChange}
        filesLimit={1}
        // acceptedFiles={['*/*']}
        // acceptedFiles={['image/jpg, image/jpeg, image/png']}
        maxFileSize={500 * 1000 * 1000} // 500mb
      />
      Upload images (jpg, png, etc.) and ZIP files. Max 500mb. RAR, FBX and
      unitypackage not supported (use ZIP)
      <br />
      <Button variant="contained" onClick={onUploadClick}>
        Upload
      </Button>
    </>
  )
}
