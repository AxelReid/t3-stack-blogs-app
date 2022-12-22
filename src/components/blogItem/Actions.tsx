import React from 'react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import {
  ChatBubbleLeftEllipsisIcon,
  LinkIcon,
  PencilSquareIcon,
  PhotoIcon,
  TrashIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ActionIcon, Group, Menu, Text } from '@mantine/core'
import { trpc } from '@/utils/trpc'

interface Props {
  blogId: string
  edit: () => void
}
const Actions: React.FC<Props> = ({ blogId, edit }) => {
  const { mutateAsync } = trpc.blogs.deleteBlog.useMutation()
  const { refetch } = trpc.blogs.getUserBlogs.useQuery()
  const { refetch: refetchUserBlogsCount } =
    trpc.blogs.getUserBlogsCount.useQuery()

  const deleteBlog = async () => {
    await mutateAsync({ blogId })
    refetch()
    refetchUserBlogsCount()
  }

  return (
    <Group noWrap>
      <ActionIcon size='lg' variant='light' color='blue' onClick={() => edit()}>
        <PencilSquareIcon width={19} />
      </ActionIcon>
      <Menu shadow='md' width={170} position='bottom-end' withArrow>
        <Menu.Target>
          <ActionIcon size='lg' variant='default'>
            <EllipsisHorizontalIcon width={20} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Link href={'/blog/' + blogId} passHref>
            <Menu.Item component='a' icon={<LinkIcon width={18} />}>
              <Text fz='xs'>Go to preview</Text>
            </Menu.Item>
          </Link>
          <Menu.Item icon={<PhotoIcon width={18} />}>
            <Text fz='xs'>Photos</Text>
          </Menu.Item>
          <Menu.Item icon={<ChatBubbleLeftEllipsisIcon width={18} />}>
            <Text fz='xs'>Comments</Text>
          </Menu.Item>
          <Menu.Item icon={<HeartIcon width={18} />}>
            <Text fz='xs'>Likes</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            color='red'
            icon={<TrashIcon width={18} />}
            onClick={() => deleteBlog()}
          >
            <Text fz='xs'>Delete this blog</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}

export default Actions
