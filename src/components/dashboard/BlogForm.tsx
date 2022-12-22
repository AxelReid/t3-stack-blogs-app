import React, { memo, useEffect } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import MyRichText from '../MyRichText'
import ImageForm, { ImagesFormType } from '../UploadImage/ImageForm'
import { useForm } from '@mantine/form'

const initialValues = {
  title: '',
  description: '',
  body: '',
  private: false,
}
export type InitialValues = typeof initialValues

interface Props extends Omit<ImagesFormType, 'clearImages'> {
  initValues?: InitialValues
  setImgErr: React.Dispatch<React.SetStateAction<boolean>>
  setThumbnail: React.Dispatch<React.SetStateAction<string | null>>
  loading: boolean
  submit: (values: InitialValues) => void
}

const BlogForm = memo(
  ({
    setSelectedImages,
    setThumbnail,
    setImgErr,
    selectedImages,
    thumbnail,
    imgErr,
    loading,
    submit,
    initValues,
  }: Props) => {
    useEffect(() => {
      if (selectedImages?.length) setImgErr(false)
    }, [selectedImages, setImgErr])

    const form = useForm({
      initialValues: {
        title: initValues?.title || initialValues.title,
        description: initValues?.description || initialValues.description,
        body: initValues?.body || initialValues.body,
        private: initValues?.private ?? initialValues.private,
      },
      validate: {
        title: (val) => (!val ? 'Enter a title' : null),
        body: (val) => {
          if (selectedImages.length < 1) setImgErr(true)
          const p = document.createElement('p')
          p.innerHTML = val
          const v = p.innerText
          p.remove()
          return !v ? 'Enter a body' : null
        },
      },
    })

    const clearImages = () => {
      setSelectedImages([])
      setThumbnail(null)
      setImgErr(false)
    }
    const reset = () => {
      clearImages()
      form.setValues(initialValues)
    }

    return (
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <TextInput
            withAsterisk
            label='Title'
            {...form.getInputProps('title')}
          />
          <TextInput
            label='Description'
            {...form.getInputProps('description')}
          />
          <Box>
            <Text className='label-text'>
              Body{' '}
              <Text span c='red'>
                *
              </Text>
            </Text>
            <MyRichText
              content={form.values.body}
              error={form.errors?.body}
              {...form.getInputProps('body')}
            />
          </Box>
          <ImageForm
            imgErr={imgErr}
            thumbnail={thumbnail}
            clearImages={clearImages}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
          <Stack mt='xl' spacing='sm' align='start'>
            <Checkbox
              label='Is your blog private?'
              checked={form.values.private}
              onChange={(e) => form.setValues({ private: e.target.checked })}
            />
            <Text c='dimmed' fz='xs' lh={1.3}>
              You can choose if your blog is public or private! If checked
              (private), it will only be visible to you and unvisible to others.
            </Text>
          </Stack>
          <Group position='right'>
            <Button
              disabled={loading}
              variant='default'
              size='md'
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button size='md' type='submit' loading={loading}>
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    )
  }
)
BlogForm.displayName = 'BlogForm'
export default BlogForm
