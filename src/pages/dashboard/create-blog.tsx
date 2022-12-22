import BlogForm, { InitialValues } from '@/components/dashboard/BlogForm'
import DashboardWrapper from '@/components/dashboard/DashboardWrapper'

import { trpc } from '@/utils/trpc'
import { ImagesGetOutput } from '@/utils/trpc-helper'

import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const CreateBlog = () => {
  const router = useRouter()
  const { mutateAsync: mutateBlog, error } = trpc.blogs.create.useMutation()
  const { mutateAsync: mutateAddImg } = trpc.images.add.useMutation()
  const { refetch } = trpc.blogs.getUserBlogsCount.useQuery()
  const [selectedImages, setSelectedImages] = useState<ImagesGetOutput>([])
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [imgErr, setImgErr] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (values: InitialValues) => {
    if (imgErr || !selectedImages?.length) return
    setLoading(true)
    const data = await mutateBlog(values)
    if (selectedImages.length) {
      selectedImages.forEach(
        async (sImg, i) =>
          await mutateAddImg({
            blogId: data.id,
            imageId: sImg.id,
            url: sImg.url,
            thumbnail: !!thumbnail || i === 0,
          })
      )
    }

    if (error) showNotification({ color: 'red', message: error.message })
    else {
      showNotification({ color: 'green', message: 'New blog created!' })
      refetch()
      router.push('/dashboard/my-blogs')
    }
    setLoading(false)
  }

  return (
    <>
      <DashboardWrapper>
        <BlogForm
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          imgErr={imgErr}
          loading={loading}
          setImgErr={setImgErr}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          submit={submit}
        />
      </DashboardWrapper>
    </>
  )
}

export default CreateBlog
