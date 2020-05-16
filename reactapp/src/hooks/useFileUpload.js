import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'

export default () => {
  const [isUploading, setIsUploading] = useState(false)
  const [percentageDone, setPercentageDone] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  const [, setIsErrored] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')

  const upload = async (file, uploadFullPath) => {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref()

      setIsSuccess(false)
      setIsErrored(false)

      let uploadTask = storageRef.child(uploadFullPath)

      if (typeof file === 'string') {
        uploadTask = uploadTask.putString(file, 'data_url')
      } else {
        uploadTask = uploadTask.put(file)
      }

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setPercentageDone(progress)

          if (snapshot.state === firebase.storage.TaskState.RUNNING) {
            setIsUploading(true)
          }
        },
        function(error) {
          console.error('Error uploading', error.code, error) // https://firebase.google.com/docs/storage/web/handle-errors

          setIsUploading(false)
          setIsSuccess(false)
          setIsErrored(true)

          reject(error)
        },
        function() {
          setIsUploading(false)
          setIsSuccess(true)
          setIsErrored(false)

          uploadTask.snapshot.ref
            .getDownloadURL()
            .then(url => {
              setDownloadUrl(url)
              resolve(url)
            })
            .catch(reject)
        }
      )
    })
  }

  return [isUploading, percentageDone, downloadUrl, isSuccess === true, upload]
}
