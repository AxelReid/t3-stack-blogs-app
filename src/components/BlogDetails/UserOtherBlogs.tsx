import React from 'react'
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core'
import useGlobalStyles from '@/styles/useGlobalStyles'
import { CalendarIcon } from '@heroicons/react/20/solid'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import useHeaderStyles from '@/styles/useHeaderStyles'
import { trpc } from '@/utils/trpc'
import Link from 'next/link'

interface Props {
  name: string | null
  userId: string
  blogId: string
}

const UserOtherBlogs: React.FC<Props> = ({ name, userId, blogId }) => {
  const { classes: gClasses } = useGlobalStyles()
  const { classes: hClasses } = useHeaderStyles()
  const { data, isLoading } = trpc.blogs.otherBlogs.useQuery({ userId, blogId })

  return (
    <Card className={gClasses.customCardBg} radius={12} withBorder>
      <Text size='sm' weight={500} color='dimmed'>
        {isLoading ? (
          <Skeleton animate radius='xl' width={150} height={13} />
        ) : (
          data?.title
        )}
      </Text>
      <Stack mt='xl' spacing='lg'>
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <Box key={i}>
                <Divider mb='md' />
                <Skeleton w={230} h={15} radius='xl' />
                <Skeleton w={100} h={15} radius='xl' mt={10} />
                <Skeleton w={140} h={15} radius='xl' mt={20} />
              </Box>
            ))
          : data?.data.map((blog) => (
              <Box key={blog.id}>
                <Divider mb='xs' />
                <Link href={'/blog/' + blog.id} passHref>
                  <Anchor
                    component='a'
                    size='sm'
                    weight={500}
                    className={hClasses.blackWhie}
                  >
                    {blog.title}
                  </Anchor>
                </Link>
                <Text color='dimmed' size='xs' mt={5}>
                  {blog.description}
                </Text>
                <Group mt={8}>
                  <Badge
                    radius={0}
                    px='xs'
                    variant='filled'
                    className={hClasses.btn}
                  >
                    <Group align='center' spacing={7}>
                      <CalendarIcon width={14} />
                      Aug 15
                    </Group>
                  </Badge>
                  <Group spacing={3}>
                    <Text fz={11} fw={400}>
                      0
                    </Text>
                    <EyeIcon width={16} />
                  </Group>
                  <Group spacing={3}>
                    <Text fz={11} fw={400}>
                      {blog._count.likes}
                    </Text>
                    <HeartIcon width={16} />
                  </Group>
                  <Group spacing={3}>
                    <Text fz={11} fw={400}>
                      {blog._count.comments}
                    </Text>
                    <ChatBubbleOvalLeftEllipsisIcon width={16} />
                  </Group>
                </Group>
              </Box>
            ))}
      </Stack>
      <Button variant='outline' c='cyan' mt='xl' size='sm' fullWidth>
        Read more
        {data?.key === 'user' && ` from ${name}`}
      </Button>
    </Card>
  )
}

export default UserOtherBlogs
