import React from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import useHeaderStyles from '@/styles/useHeaderStyles'
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Group,
  MediaQuery,
  Text,
  TextInput,
} from '@mantine/core'
import IconLink from './IconLink'
import MyBlogsIcon from './MyBlogsIcon'
import MyLikedBlogsIcon from './MyLikedBlogsIcon'
import ThemeSwitcher from './ThemeSwitcher'

const RightSection = () => {
  const { data: session, status } = useSession()
  const { classes, cx } = useHeaderStyles()

  return (
    <Group align='center' spacing='lg'>
      <MediaQuery smallerThan='lg' styles={{ display: 'none' }}>
        <TextInput
          rightSection={
            <Center mr='xs'>
              <ActionIcon size='lg' radius='xl' variant='transparent'>
                <MagnifyingGlassIcon width={21} className={classes.blackWhie} />
              </ActionIcon>
            </Center>
          }
          variant='filled'
          placeholder='Search'
          radius='md'
          size='md'
        />
      </MediaQuery>
      <MediaQuery largerThan='lg' styles={{ display: 'none' }}>
        <div>
          <IconLink
            icon={
              <MagnifyingGlassIcon width={23} className={classes.blackWhie} />
            }
            tooltipLabel='Search'
          />
        </div>
      </MediaQuery>
      <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
        <div>
          <MyLikedBlogsIcon />
        </div>
      </MediaQuery>
      <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
        <div>
          <MyBlogsIcon />
        </div>
      </MediaQuery>
      <ThemeSwitcher />
      {status === 'unauthenticated' ? (
        <Button
          radius='xl'
          className={cx(classes.btn)}
          onClick={() => signIn()}
        >
          Get started
        </Button>
      ) : (
        <>
          <MediaQuery smallerThan='xs' styles={{ display: 'none' }}>
            <div>
              <Link href='/dashboard/create-blog' passHref>
                <Button
                  component='a'
                  radius='xl'
                  pl='sm'
                  className={cx(classes.btn)}
                  leftIcon={<PlusCircleIcon width={24} />}
                >
                  Create
                </Button>
              </Link>
            </div>
          </MediaQuery>
          <Link href='/dashboard' passHref>
            <ActionIcon component='a' w='auto' size='xl' px={6} radius='xl'>
              <Group align='center' spacing='sm'>
                <Avatar radius='xl' size={33} src={session?.user?.image}>
                  {session?.user?.name?.charAt(0)}
                </Avatar>
                <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
                  <Box>
                    <Text fz={10} lh={1.4} className={classes.blackWhie}>
                      Welcome!
                    </Text>
                    <Text fz={10} lh={1.4} className={classes.blackWhie}>
                      {session?.user?.name}
                    </Text>
                  </Box>
                </MediaQuery>
              </Group>
            </ActionIcon>
          </Link>
        </>
      )}
    </Group>
  )
}

export default RightSection
