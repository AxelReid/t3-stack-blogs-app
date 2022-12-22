import { trpc } from '@/utils/trpc'
import {
  Box,
  Center,
  Divider,
  Group,
  Indicator,
  Stack,
  Text,
} from '@mantine/core'
import { useSession } from 'next-auth/react'
import React from 'react'
import Comment from './Comment'
import CommentAdd from './CommentAdd'

interface Props {
  blogId: string
}

const Comments: React.FC<Props> = ({ blogId }) => {
  const { data: session } = useSession()
  const { data, refetch } = trpc.comments.getByBlogId.useQuery({ blogId })

  return (
    <Box my={50}>
      <Group>
        <Indicator
          label={data?.length?.toString()}
          color='dark'
          offset={-6}
          styles={{ common: { padding: '9px 6px' } }}
        >
          <Text fw={600}>Comments</Text>
        </Indicator>
      </Group>
      <Divider />
      <Box pt='lg'>
        <Stack spacing='xl'>
          {!data ? (
            <Center>
              <Text c='dimmed' italic py='xl'>
                No comments yet
              </Text>
            </Center>
          ) : (
            data.map((cm) => (
              <Comment
                thisUser={session?.user?.id === cm.User?.id}
                refetch={refetch}
                key={cm.id}
                {...cm}
              />
            ))
          )}
          <CommentAdd blogId={blogId} refetch={refetch} />
        </Stack>
      </Box>
    </Box>
  )
}

export default Comments
