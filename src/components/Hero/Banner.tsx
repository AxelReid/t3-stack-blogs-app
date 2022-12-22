import React from 'react'
import { Box, Card, createStyles, Group, Stack, Text } from '@mantine/core'
import useGlobalStyles from '@/styles/useGlobalStyles'
import Link from 'next/link'
import { trpc } from '@/utils/trpc'
import Image from 'next/image'

const useStyles = createStyles((theme) => ({
  group: {
    flex: 1,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexWrap: 'wrap',
    },
  },
  content: {
    flexBasis: 350,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexBasis: 'auto',
    },
  },
}))

const Banner = () => {
  const { classes: gClasses } = useGlobalStyles()
  const { data } = trpc.blogs.firstBlog.useQuery()
  const { classes } = useStyles()

  return (
    <>
      <Group spacing={25} align='stretch' noWrap className={classes.group}>
        <Card
          radius='lg'
          className={gClasses.customCardBg}
          mih={390}
          sx={{ flex: '1 1 auto', aspectRatio: '12/5' }}
        >
          <Card.Section>
            <Image
              src={data?.images[0]?.url || ''}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              blurDataURL={data?.images[0]?.url || ''}
              alt=''
            />
          </Card.Section>
        </Card>

        <Box className={classes.content}>
          <Stack justify='space-between' h='100%'>
            <div>
              <Text fw={800} fz={40} tt='uppercase' lh={1.3}>
                {data?.title}
              </Text>
              <Text c='dimmed' mt='lg'>
                {data?.description}
              </Text>
            </div>
            <div>
              <Text c='dimmed' mt='lg'>
                Click the link below to read further.
              </Text>
              <Link href={'/blog/' + data?.id} passHref>
                <Text component='a' variant='link' size='sm'>
                  Read more
                </Text>
              </Link>
            </div>
          </Stack>
        </Box>
      </Group>
    </>
  )
}

export default Banner
