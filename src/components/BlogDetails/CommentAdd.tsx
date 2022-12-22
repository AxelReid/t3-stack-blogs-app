import useHeaderStyles from '@/styles/useHeaderStyles'
import { trpc } from '@/utils/trpc'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Text,
  TextInput,
} from '@mantine/core'
import { signIn, useSession } from 'next-auth/react'
import React, { memo, useState } from 'react'

interface Props {
  blogId: string
  refetch: () => void
}

const CommentAdd: React.FC<Props> = memo(({ blogId, refetch }) => {
  const { data: session, status } = useSession()
  const { classes: hClasses } = useHeaderStyles()
  const { mutateAsync } = trpc.comments.add.useMutation()
  const [comment, setComment] = useState('')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (comment && status === 'authenticated') {
      await mutateAsync({ blogId, comment })
      setComment('')
      refetch()
    }
  }

  return (
    <div>
      <Group align='start' noWrap>
        <Avatar radius='xl' size={45} src={session?.user?.image}>
          {session?.user?.name?.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Text fw={500} mt={13} fz='sm'>
            {session?.user?.name || 'Guest'}
          </Text>
          <form onSubmit={submit}>
            <Group py={5}>
              <TextInput
                style={{ flex: 1 }}
                variant='unstyled'
                placeholder='Add a comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={status === 'unauthenticated'}
              />
              {status === 'authenticated' ? (
                <Button type='submit' mr={2} className={hClasses.btn}>
                  Comment
                </Button>
              ) : (
                <Button
                  onClick={() => signIn()}
                  mr={2}
                  color='red'
                  leftIcon={<LockClosedIcon width={18} />}
                >
                  Login to comment
                </Button>
              )}
            </Group>
          </form>
          <Divider />
        </Box>
      </Group>
    </div>
  )
})

CommentAdd.displayName = 'CommentAdd'
export default CommentAdd
