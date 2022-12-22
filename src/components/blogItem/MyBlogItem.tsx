import React, { memo } from 'react'
import { HeartIcon as HeartFilledIcon } from '@heroicons/react/20/solid'
import { ChatBubbleLeftRightIcon, EyeIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Badge, Box, Card, Group, Stack, Text } from '@mantine/core'
import useGlobalStyles from '@/styles/useGlobalStyles'
import { BlogOutput } from '@/utils/trpc-helper'
import Actions from './Actions'

interface Props {
  edit: () => void
}

const MyBlogItem: React.FC<BlogOutput & Props> = memo(
  ({ id, title, createdAt, images, _count, edit }) => {
    const { classes: gClasses } = useGlobalStyles()
    return (
      <tr>
        <td>
          <Group noWrap>
            <Card p={0} miw={60} h={60} className={gClasses.customCardBg}>
              <Image
                src={images[0]?.url || ''}
                objectFit='cover'
                width={60}
                height={60}
                alt=''
              />
            </Card>
            <Text fw={500} lineClamp={2}>
              {title}
            </Text>
          </Group>
        </td>
        <td>
          <Stack align='start' spacing={4}>
            <Badge
              variant='outline'
              color='cyan'
              styles={{ inner: { textTransform: 'capitalize' } }}
            >
              Created
            </Badge>
            <Text c='dimmed' fz='xs'>
              {createdAt.toLocaleDateString()}
            </Text>
          </Stack>
        </td>
        <td>
          <Group spacing={30} position='apart' noWrap>
            <Group spacing={30} noWrap>
              <Box>
                <Group align='center' spacing={5} noWrap>
                  <Text fz={20}>{_count.likes}</Text>
                  <HeartFilledIcon width={22} color='red' />
                </Group>
                <Text c='dimmed' fz='xs' lh={1.3}>
                  Total likes
                </Text>
              </Box>
              <Box>
                <Group align='center' spacing={5} noWrap>
                  <Text fz={20}>{_count.comments}</Text>
                  <ChatBubbleLeftRightIcon width={22} />
                </Group>
                <Text c='dimmed' fz='xs' lh={1.3}>
                  Total comments
                </Text>
              </Box>
              <Box>
                <Group align='center' spacing={5} noWrap>
                  <Text fz={20}>0</Text>
                  <EyeIcon width={22} />
                </Group>
                <Text c='dimmed' fz='xs' lh={1.3}>
                  Total views
                </Text>
              </Box>
            </Group>
            <Actions edit={edit} blogId={id} />
          </Group>
        </td>
      </tr>
    )
  }
)
MyBlogItem.displayName = 'MyBlogItem'

export default MyBlogItem
