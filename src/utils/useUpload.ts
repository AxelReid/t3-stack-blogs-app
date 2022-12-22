import axios from 'axios'
import { useState } from 'react'
import { trpc } from './trpc'

const useUpload = () => {
  const { mutateAsync } = trpc.images.create.useMutation()
  const [loading, setLoading] = useState(false)

  const upload = async (files: File[]) => {
    setLoading(true)
    try {
      const data = await axios.all(
        files.map(async (file) => {
          const formData = new FormData()
          formData.set('file', file)
          formData.set('upload_preset', 'carrent')
          formData.set('folder', 'asilbek')
          const res = await axios.post(
            'https://api.cloudinary.com/v1_1/a7xr7/image/upload',
            formData
          )

          const save = {
            id: res.data?.public_id,
            url: res.data.secure_url,
            bytes: res.data.bytes,
            format: res.data.format,
            width: res.data.width,
            height: res.data.height,
          }
          if (res.data?.public_id) {
            await mutateAsync(save)
          }
          return save
        })
      )
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  return { upload, loading }
}
export default useUpload
