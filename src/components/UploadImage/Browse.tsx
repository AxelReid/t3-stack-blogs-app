import React from 'react'
import Image from 'next/image'
import { ImageModalProps } from '@/types/props'
import { ImagesGetOutput } from '@/utils/trpc-helper'
import {
  Button,
  Card,
  createStyles,
  Group,
  Skeleton,
  Text,
} from '@mantine/core'
import useGlobalStyles from '@/styles/useGlobalStyles'

const useStyles = createStyles((theme) => ({
  previewImg: {
    width: 110,
    height: 110,
    '&:hover .inner-icon': {
      display: 'flex',
    },
  },
  previewImgSelected: {
    borderColor: theme.colors.blue,
  },
}))

interface Props extends ImageModalProps {
  images: ImagesGetOutput | undefined
  isLoading: boolean
  closeModal: () => void
}

const Browse = ({
  closeModal,
  images,
  isLoading,
  selectedImages,
  setSelectedImages,
}: Props) => {
  const { classes, cx } = useStyles()
  const { classes: gClasses } = useGlobalStyles()

  const removeImg = (id: string) =>
    setSelectedImages((prev) => prev.filter((img) => img.id !== id))

  const finish = (cancel?: boolean) => {
    if (cancel) setSelectedImages([])
    closeModal()
  }

  return (
    <div>
      {isLoading ? (
        <Group>
          <Skeleton width={110} height={110} radius='md' />
          <Skeleton width={110} height={110} radius='md' />
          <Skeleton width={110} height={110} radius='md' />
        </Group>
      ) : images?.length ? (
        <Group mb='sm' spacing='xs'>
          {images.map((img, i) => {
            const isSelected =
              selectedImages?.findIndex(
                (selectedImg) => selectedImg.id === img.id
              ) !== -1
            return (
              <Card
                withBorder={isSelected}
                p={0}
                key={i}
                className={cx(classes.previewImg, gClasses.customCardBg, {
                  [classes.previewImgSelected]: isSelected,
                })}
                onClick={() => {
                  isSelected
                    ? removeImg(img.id)
                    : setSelectedImages((prev) => [...prev, img])
                }}
              >
                <Image
                  src={img?.url}
                  width={110}
                  height={110}
                  alt={''}
                  objectFit='cover'
                />
              </Card>
            )
          })}
        </Group>
      ) : (
        <Text c='dimmed' fz='sm' align='center'>
          No uploaded images
        </Text>
      )}

      <Group mt='md' position='right'>
        <Button variant='default' onClick={() => setSelectedImages([])}>
          Disselect All
        </Button>
        <Button variant='outline' onClick={() => finish()}>
          OK
        </Button>
      </Group>
    </div>
  )
}

export default Browse
