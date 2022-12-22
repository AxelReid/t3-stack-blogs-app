import React, { useState } from 'react'
import { Box, Tabs } from '@mantine/core'
import { ArrowUpTrayIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import Browse from './Browse'
import UploadNew from './UploadNew'
import { trpc } from '@/utils/trpc'
import { ImageModalProps } from '@/types/props'

interface Props extends ImageModalProps {
  closeModal: () => void
}

const UploadImageModalContent = ({
  closeModal,
  selectedImages,
  setSelectedImages,
}: Props) => {
  const { data, isLoading, refetch } = trpc.images.getAll.useQuery()
  const [activeTab, setActiveTab] = useState<'browse' | 'upload'>('browse')

  return (
    <>
      <Tabs
        value={activeTab}
        onTabChange={(val: 'browse' | 'upload') => setActiveTab(val)}
      >
        <Tabs.List>
          <Tabs.Tab icon={<FolderOpenIcon width={20} />} value='browse'>
            Browse
          </Tabs.Tab>
          <Tabs.Tab icon={<ArrowUpTrayIcon width={20} />} value='upload'>
            Upload New
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='browse'>
          <Box mt='lg'>
            <Browse
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              images={data}
              isLoading={isLoading}
              closeModal={closeModal}
            />
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value='upload'>
          <Box mt='lg'>
            <UploadNew setActiveTab={setActiveTab} refetch={refetch} />
          </Box>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default UploadImageModalContent
