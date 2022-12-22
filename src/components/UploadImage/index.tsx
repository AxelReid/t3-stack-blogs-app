import React from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
import UploadImageModalContent from './UploadImageModalContent'
import { ImageModalProps, SetStateType } from '@/types/props'

const UploadImage: React.FC<
  {
    isOpen: boolean
    setIsOpen: SetStateType<boolean>
  } & ImageModalProps
> = ({ isOpen, setIsOpen, selectedImages, setSelectedImages }) => {
  const theme = useMantineTheme()

  return (
    <Modal
      title='Images'
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      centered
      size='1000px'
      overlayOpacity={0.3}
      overlayBlur={3}
      overlayColor={
        theme.colorScheme === 'dark' ? theme.black : theme.colors.dark[2]
      }
    >
      <UploadImageModalContent
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        closeModal={() => setIsOpen(false)}
      />
    </Modal>
  )
}

export default UploadImage
