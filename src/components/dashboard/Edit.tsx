import { trpc } from '@/utils/trpc'
import { ImagesGetOutput } from '@/utils/trpc-helper'
import { LoadingOverlay } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogForm, { InitialValues } from './BlogForm'

const Edit: React.FC<{ blogId: string; refetch: () => void }> = ({
  blogId,
  refetch,
}) => {
  const {
    data,
    refetch: refetchThis,
    isLoading,
  } = trpc.blogs.getUserBlogToEdit.useQuery({
    blogId,
  })
  const { mutateAsync } = trpc.blogs.updateBlog.useMutation()

  const [selectedImages, setSelectedImages] = useState<ImagesGetOutput>([])
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [imgErr, setImgErr] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const images = data?.images.map(({ imageId, url, thumbnail }) => ({
      id: imageId || '',
      url,
      thumbnail,
    }))
    setSelectedImages(images || [])
  }, [data?.images])

  if (isLoading) return <LoadingOverlay visible sx={{ height: 500 }} />

  const initialValues = {
    title: data?.title || '',
    description: data?.description || '',
    body: data?.body || '',
    private: data?.private ?? false,
  }

  const submit = async (values: InitialValues) => {
    if (imgErr) return
    setLoading(true)
    await mutateAsync({ blogId, ...values }).catch(() => null)
    refetchThis()
    axios.post('/api/revalidate', { url: '/blog/' + blogId }).catch(() => null)
    showNotification({ color: 'green', message: 'Updated successfully' })
    refetch()
    setLoading(false)
  }

  return (
    <BlogForm
      selectedImages={selectedImages}
      setSelectedImages={setSelectedImages}
      imgErr={imgErr}
      loading={loading}
      setImgErr={setImgErr}
      thumbnail={thumbnail}
      setThumbnail={setThumbnail}
      submit={submit}
      initValues={initialValues}
    />
  )
}

export default Edit
