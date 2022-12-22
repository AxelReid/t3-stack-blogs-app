import React from 'react'
import { Anchor, Avatar, Badge, Group, Stack, Text } from '@mantine/core'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/20/solid'
import useHeaderStyles from '@/styles/useHeaderStyles'
import CardImage from '../CardImage'
import Link from 'next/link'

const CoverBlog = () => {
  const { classes: hClasses } = useHeaderStyles()

  return (
    <Stack>
      <CardImage ratio={4 / 2.5} />
      <Group spacing='md'>
        <Badge radius={0} py={14} size='lg' className={hClasses.btnDarker}>
          <Group align='center' spacing={7}>
            <CalendarIcon width={18} />
            <span style={{ marginTop: 2 }}>Aug 15</span>
          </Group>
        </Badge>
        <Group spacing={5}>
          <Text fz='sm' fw={400} mt={2.5}>
            1.5K
          </Text>
          <HeartIcon color='red' width={22} />
        </Group>
      </Group>
      <Link href='/' passHref>
        <Anchor
          component='a'
          mt='sm'
          weight={600}
          size='xl'
          className={hClasses.blackWhie}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
          assumenda cumque, nihil dicta placeat error ipsa?
        </Anchor>
      </Link>
      <Text c='dimmed'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus harum
        laborum distinctio dicta fugiat. Consectetur et sit officiis ab.
        Provident natus in commodi omnis aut ad facilis adipisci, deserunt autem
        sed minus perspiciatis consectetur aperiam.
      </Text>
      <Group>
        <Avatar
          // src={}
          variant='filled'
          color='red'
          radius='xl'
          size={40}
        >
          A
        </Avatar>
        <Text fw={500} fz='sm'>
          Asilbek Anvarbekov
        </Text>
      </Group>
    </Stack>
  )
}

export default CoverBlog
