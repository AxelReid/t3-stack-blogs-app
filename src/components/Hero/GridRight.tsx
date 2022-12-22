import React from 'react'
import CardImage from '../CardImage'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/20/solid'
import { Anchor, Badge, Box, Group, Space, Stack, Text } from '@mantine/core'
import useHeaderStyles from '@/styles/useHeaderStyles'
import Link from 'next/link'

const GridRight = () => {
  const { classes: hClasses } = useHeaderStyles()

  return (
    <Stack>
      {[...Array(4)].map((_, i) => (
        <Group key={i} align='stretch' noWrap spacing='lg'>
          <CardImage ratio={1 / 1} sx={{ flexShrink: 0, flexBasis: 150 }} />
          <Box>
            <Group spacing='md'>
              <Badge
                radius={0}
                py='sm'
                size='md'
                className={hClasses.btnDarker}
              >
                <Group align='center' spacing={7}>
                  <CalendarIcon width={16} />
                  <span style={{ marginTop: 2 }}>Aug 15</span>
                </Group>
              </Badge>
              <Group spacing={5}>
                <Text fz='xs' fw={400}>
                  1.5K
                </Text>
                <HeartIcon color='red' width={18} />
              </Group>
            </Group>
            <Link href='/' passHref>
              <Anchor
                component='a'
                weight={600}
                size='md'
                className={hClasses.blackWhie}
                lineClamp={4}
              >
                <Space mt='sm' />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
                assumenda cumque, nihil dicta placeat error ipsa?
              </Anchor>
            </Link>
          </Box>
        </Group>
      ))}
    </Stack>
  )
}

export default GridRight
