import React, { useState } from 'react'
import Image from 'next/image'
import useGlobalStyles from '@/styles/useGlobalStyles'
import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Center,
  createStyles,
  Group,
  Overlay,
  Text,
} from '@mantine/core'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { BlogOutput } from '@/utils/trpc-helper'
import Link from 'next/link'

const useStyles = createStyles((theme, _, getRef) => ({
  card: {
    transition: 'box-shadow .3s',
    '.image': {
      transition: 'transform .3s',
    },
    '&:hover': {
      boxShadow: `0 10px 20px ${theme.fn.rgba(
        'black',
        theme.colorScheme === 'dark' ? 0.7 : 0.2
      )}`,
      '.image': {
        transform: 'scale(1.05)',
      },
      ['.' + getRef('overlay')]: {
        opacity: 1,
      },
    },
  },
  innerContainer: {
    zIndex: 1,
    width: '100%',
  },
  overlay: {
    ref: getRef('overlay'),
    zIndex: -1,
    transition: 'opacity .3s',
    background: theme.fn.linearGradient(180, 'transparent', 'black'),
  },
}))

const BigCard: React.FC<BlogOutput> = ({
  id,
  createdAt,
  title,
  images,
  user,
}) => {
  const { classes: gClasses } = useGlobalStyles()
  const { classes, cx } = useStyles()
  const imgUrl = images[0]?.url
  const [noImg, setNoImg] = useState(!imgUrl)

  return (
    <AspectRatio w={270} ratio={3 / 4}>
      <Link href={'/blog/' + id} passHref>
        <Card
          component='a'
          radius='lg'
          withBorder
          className={cx(gClasses.customCardBg, classes.card)}
        >
          {noImg || !imgUrl ? (
            <Center pos='absolute' inset={0} pb={40}>
              <PhotoIcon width='50%' strokeWidth={0.2} opacity={0.3} />
            </Center>
          ) : (
            <Image
              src={imgUrl}
              layout='fill'
              objectFit='cover'
              alt=''
              className='image'
              placeholder='blur'
              blurDataURL={imgUrl}
              onLoad={() => setNoImg(false)}
              onError={() => setNoImg(true)}
            />
          )}
          <Card.Section
            mt='auto'
            pt='md'
            miw={270}
            pos='relative'
            sx={{ isolation: 'isolate' }}
          >
            <Box p='md' className={classes.innerContainer}>
              <Text c='white' fw={600} fz='md' lh={1.3}>
                {title}
              </Text>
              <Group mt='md' align='center' spacing='xs' noWrap>
                <Avatar
                  src={user.image}
                  variant='filled'
                  color='red'
                  radius='xl'
                  size={30}
                >
                  {user.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Text fz={13} c='white' lineClamp={1} lh={1.3}>
                    {user.name}
                  </Text>
                  <Text lh={1.3} fw={600} c='dimmed' fz={10} lineClamp={1}>
                    {createdAt.toLocaleString()}
                  </Text>
                </Box>
              </Group>
            </Box>
            <Overlay color='none' className={classes.overlay} opacity={0.8} />
          </Card.Section>
        </Card>
      </Link>
    </AspectRatio>
  )
}

export default BigCard
