import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/outline'
import {
  ActionIcon,
  Box,
  Button,
  Card,
  CheckIcon,
  Group,
  Text,
  Tooltip,
} from '@mantine/core'
import UploadImage from '@/components/UploadImage'
import React, { memo, useState } from 'react'
import Image from 'next/image'
import useGlobalStyles from '@/styles/useGlobalStyles'
import { ImagesGetOutput } from '@/utils/trpc-helper'

export interface ImagesFormType {
  imgErr: boolean
  selectedImages: ImagesGetOutput
  setSelectedImages: React.Dispatch<React.SetStateAction<ImagesGetOutput>>
  clearImages: () => void
  thumbnail: string | null
}

const ImageForm = memo(
  ({
    imgErr,
    selectedImages,
    setSelectedImages,
    clearImages,
    thumbnail,
  }: ImagesFormType) => {
    const { classes: gClasses } = useGlobalStyles()
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <UploadImage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
        <Box>
          <Text className='label-text'>Images</Text>
          <Group>
            <Button
              onClick={() => setIsOpen(true)}
              variant='default'
              size='md'
              leftIcon={<ArrowUpTrayIcon width={18} />}
            >
              Select
            </Button>
            {selectedImages?.length > 0 && (
              <Button
                onClick={() => clearImages()}
                variant='light'
                color='red'
                size='md'
                leftIcon={<TrashIcon width={18} />}
              >
                Clear
              </Button>
            )}
          </Group>
          {imgErr && (
            <Text c='red' fz='sm' mt={3}>
              Select at least an image
            </Text>
          )}
        </Box>
        <Group>
          {selectedImages.map((image, i) => {
            const thumb = !thumbnail ? i === 0 : image.id === thumbnail
            return (
              <Box key={image.id} sx={{ position: 'relative' }}>
                <Card
                  className={gClasses.customCardBg}
                  sx={{ width: 120, height: 120 }}
                  p={0}
                >
                  <Image
                    objectFit='cover'
                    width={120}
                    height={120}
                    src={image.url}
                    alt=''
                  />
                </Card>
                <Tooltip position='top' withArrow label='Thumbnail image'>
                  <ActionIcon
                    radius='xl'
                    size='sm'
                    variant={thumb ? 'filled' : 'default'}
                    color='blue'
                    sx={{ position: 'absolute', top: 4, right: 4 }}
                    onClick={() =>
                      setSelectedImages((prev) =>
                        prev.map(({ id, url }) => ({
                          id,
                          url,
                          thumbnail: image.id === id ? true : false,
                        }))
                      )
                    }
                  >
                    {thumb && <CheckIcon width={14} />}
                  </ActionIcon>
                </Tooltip>
              </Box>
            )
          })}
        </Group>
      </>
    )
  }
)
ImageForm.displayName = 'ImageForm'
export default ImageForm
