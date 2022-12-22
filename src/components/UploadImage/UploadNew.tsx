import useGlobalStyles from '@/styles/useGlobalStyles'
import { SetStateType } from '@/types/props'
import useUpload from '@/utils/useUpload'
import {
  ArrowUpTrayIcon,
  PhotoIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import {
  ActionIcon,
  Button,
  Card,
  Group,
  LoadingOverlay,
  ScrollArea,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import Image from 'next/image'
import React, { useState } from 'react'

interface Props {
  refetch: () => void
  setActiveTab: SetStateType<'browse' | 'upload'>
}

const UploadNew = ({ refetch, setActiveTab }: Props) => {
  const theme = useMantineTheme()
  const { classes: gClasses } = useGlobalStyles()
  const [uploadedFiles, setFiles] = useState<File[]>([])
  const { upload, loading } = useUpload()

  const handleUploads = (files: File[]) => {
    const uniqueOj = [...uploadedFiles, ...files].filter(
      (file, index, self) =>
        index ===
        self.findIndex((t) => t.name === file.name && t.size === file.size)
    )
    setFiles(uniqueOj)
  }

  const removeImg = (name: string) =>
    setFiles((prev) => prev.filter((file) => file.name !== name))

  const upload_finish = async () => {
    await upload(uploadedFiles)
    setFiles([])
    refetch()
    setActiveTab('browse')
  }

  return (
    <>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Dropzone onDrop={handleUploads} accept={IMAGE_MIME_TYPE}>
        <Group
          position='center'
          spacing='xl'
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <ArrowUpTrayIcon
              width={50}
              color={theme.colors.blue[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <XCircleIcon
              width={50}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <PhotoIcon width={50} />
          </Dropzone.Idle>

          <div>
            <Text size='xl' inline>
              Drag images here or click to select files
            </Text>
            <Text size='sm' color='dimmed' inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {uploadedFiles.length ? (
        <ScrollArea mt='lg'>
          <Group mb='sm' spacing='xs'>
            {uploadedFiles.map((file, i) => {
              const link = URL.createObjectURL(file)
              return (
                <Card
                  key={i}
                  p={0}
                  className={gClasses.customCardBg}
                  sx={{ width: 97, height: 97 }}
                >
                  <Image
                    src={link}
                    onLoad={() => URL.revokeObjectURL(link)}
                    width={97}
                    height={97}
                    alt={file.name}
                    objectFit='cover'
                  />
                  <Card
                    p={0}
                    radius='xl'
                    withBorder
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                    }}
                  >
                    <ActionIcon
                      variant='subtle'
                      onClick={() => removeImg(file.name)}
                    >
                      <TrashIcon width={15} />
                    </ActionIcon>
                  </Card>
                </Card>
              )
            })}
          </Group>
        </ScrollArea>
      ) : null}
      <Group mt='md' position='right'>
        <Button
          variant='light'
          disabled={!uploadedFiles.length}
          onClick={upload_finish}
        >
          Upload
        </Button>
      </Group>
    </>
  )
}

export default UploadNew
