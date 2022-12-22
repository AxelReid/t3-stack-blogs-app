/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {
  ActionIcon,
  Avatar,
  Grid,
  Group,
  Stack,
  Text,
  TypographyStylesProvider,
} from '@mantine/core'
import useHeaderStyles from '@/styles/useHeaderStyles'
import { BlogDetailsOutput } from '@/utils/trpc-helper'
import { EyeIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'
import {
  CalendarIcon,
  HeartIcon as HeartFilledIcon,
} from '@heroicons/react/20/solid'
import { trpc } from '@/utils/trpc'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface Props {
  blog: BlogDetailsOutput
}

const BlogDetails = ({ blog }: Props) => {
  const { classes: hClasses } = useHeaderStyles()
  const { status } = useSession()

  if (!blog) return null
  const { id, title, description, body, createdAt, user, images } = blog
  const { data, refetch } = trpc.likes.get.useQuery({ blogId: id })
  const { refetch: refetchWishlistCount } =
    trpc.blogs.getUserLikedBlogsCount.useQuery()
  const { mutateAsync } = trpc.likes.toggle.useMutation()

  const handleLike = async () => {
    await mutateAsync({ blogId: id })
    refetchWishlistCount()
    refetch()
  }

  return (
    <div style={{ flex: 1 }}>
      <Stack spacing={40}>
        <Text
          fz={{ base: 50, sm: 60, lg: 70 }}
          className={hClasses.blackWhie}
          fw={800}
          lh={1.1}
        >
          {title}
        </Text>
        <Text c='dimmed' fz='md' italic>
          {description}
        </Text>

        <Group position='apart'>
          <Group align='center' spacing='xl'>
            <Group spacing={12}>
              <Avatar radius='xl' size={45} src={user.image}>
                {user.name?.charAt(0)}
              </Avatar>
              <Text mt={4} fz='sm'>
                {user.name}
              </Text>
            </Group>
            <Group spacing={7}>
              <CalendarIcon width={18} opacity={0.6} />
              <Text c='dimmed' fz='xs' mt={3}>
                {createdAt.toString()}
              </Text>
            </Group>
            <Group spacing={7}>
              <EyeIcon width={18} opacity={0.6} />
              <Text c='dimmed' fz='xs' mt={2}>
                12.5K
              </Text>
            </Group>
          </Group>
          <Group spacing='xl'>
            <Group spacing={7}>
              <Text align='center' fz='xs'>
                {data?.count}
              </Text>
              <ActionIcon
                pt={2}
                size={37}
                variant={data?.isLiked ? 'light' : 'subtle'}
                color={data?.isLiked ? 'red' : 'gray'}
                radius='xl'
                onClick={() =>
                  status === 'authenticated' ? handleLike() : null
                }
              >
                {data?.isLiked ? (
                  <HeartFilledIcon width={24} color='red' />
                ) : (
                  <HeartIcon width={24} />
                )}
              </ActionIcon>
            </Group>
            <ActionIcon size={37} variant='subtle' radius='xl'>
              <ShareIcon width={24} />
            </ActionIcon>
          </Group>
        </Group>
        <Grid align='start'>
          {images.length === 1 ? (
            <Image
              key={images[0]?.id}
              src={images[0]?.url || ''}
              width={images[0]?.image?.width}
              height={images[0]?.image?.height}
              blurDataURL={images[0]?.url}
              placeholder='blur'
              alt=''
            />
          ) : (
            images.map((image) => (
              <Grid.Col sm={6} key={image.id}>
                <Image
                  key={image.id}
                  src={image.url}
                  width={image.image?.width}
                  height={image.image?.height}
                  blurDataURL={image.url}
                  placeholder='blur'
                  alt=''
                />
              </Grid.Col>
            ))
          )}
        </Grid>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </TypographyStylesProvider>
      </Stack>
    </div>
  )
}

export default BlogDetails
