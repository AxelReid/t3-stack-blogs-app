import { trpc } from '@/utils/trpc'
import { CommentOutput } from '@/utils/trpc-helper'
import {
  TrashIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { ActionIcon, Avatar, Box, Group, Text, TextInput } from '@mantine/core'
import React, { memo, useRef, useState } from 'react'

const Comment: React.FC<
  CommentOutput & { refetch: () => void; thisUser: boolean }
> = memo(({ id, comment, createdAt, User, refetch, thisUser }) => {
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)
  const { mutateAsync: mutateRemoveAsync, isLoading: removeIsLoading } =
    trpc.comments.delete.useMutation()
  const { mutateAsync: mutateUpdateAsync, isLoading: updateIsLoading } =
    trpc.comments.update.useMutation()
  const [editing, setEditing] = useState(false)

  const removeComment = async () => {
    // IMPORTANT! should i wrap react-query in try-catch?
    await mutateRemoveAsync({ id, userId: User?.id }).catch(() => null)
    refetch()
  }

  const updateComment = async () => {
    const value = inputRef.current?.value

    if (!value) return
    if (value !== comment) {
      await mutateUpdateAsync({ commentId: id, comment: value })
      refetch()
    }
    setEditing(false)
  }

  return (
    <div>
      <Group align='start' noWrap>
        <Avatar radius='xl' size={45} src={User?.image}>
          {User?.name?.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Group>
            <div>
              <Text mt={4} fz='sm' fw={500}>
                {User?.name}
              </Text>
              <Text fz='xs' c='dimmed'>
                {createdAt.toLocaleString()}
              </Text>
            </div>
            {thisUser && (
              <Group spacing='sm'>
                <ActionIcon
                  variant='default'
                  radius='xl'
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? (
                    <XMarkIcon width={14} />
                  ) : (
                    <PencilIcon width={13} />
                  )}
                </ActionIcon>
                <ActionIcon
                  loading={removeIsLoading}
                  variant='light'
                  c='red'
                  radius='xl'
                  onClick={() => removeComment()}
                >
                  <TrashIcon width={14} />
                </ActionIcon>
              </Group>
            )}
          </Group>
          {editing ? (
            <Group align='center' mt='xs' spacing='xs'>
              <TextInput autoFocus ref={inputRef} defaultValue={comment} />
              <ActionIcon
                loading={updateIsLoading}
                variant='light'
                color='blue'
                radius='xl'
                onClick={() => updateComment()}
              >
                <CheckIcon width={14} />
              </ActionIcon>
            </Group>
          ) : (
            <Text fz='sm' mt='xs'>
              {comment}
            </Text>
          )}
        </Box>
      </Group>
    </div>
  )
})
Comment.displayName = 'Comment'
export default Comment
