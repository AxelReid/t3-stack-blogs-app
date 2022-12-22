import {
  Card,
  Divider,
  Group,
  MediaQuery,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core'
import React, { memo } from 'react'
import Wrapper from '../Wrapper'
import { NewspaperIcon } from '@heroicons/react/24/outline'
import RightSection from './RightSection'
import useHeaderStyles from '@/styles/useHeaderStyles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconArrowBarDown } from '@tabler/icons'
import { NextLink } from '@mantine/next'

const links = [
  { label: 'Home', path: '/' },
  { label: 'All blogs', path: '/blogs' },
  { label: 'Bloggers', path: '/bloggers' },
]

const MyHeader = memo(() => {
  const { classes, cx } = useHeaderStyles()
  const router = useRouter()

  return (
    <Card
      className={classes.root}
      pos='sticky'
      top={0}
      radius={0}
      p={0}
      withBorder
    >
      <Wrapper>
        <Group position='apart' align='center' h={{ base: 60, xs: 78 }}>
          <Group align='center' spacing={10}>
            <MediaQuery largerThan={830} styles={{ display: 'none' }}>
              <div>
                <Menu
                  width={170}
                  shadow='lg'
                  withArrow
                  position='bottom-start'
                  offset={20}
                  transition='scale-y'
                >
                  <Menu.Target>
                    <UnstyledButton mt={7} h={20}>
                      <IconArrowBarDown width={20} height={20} />
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {links.map((link, i) => {
                      const active = router.pathname === link.path
                      return (
                        <Menu.Item
                          key={i}
                          component={NextLink}
                          href={link.path}
                          fw={active ? 600 : 500}
                          className={cx({
                            [classes.blackWhie]: active,
                          })}
                        >
                          {link.label}
                        </Menu.Item>
                      )
                    })}
                  </Menu.Dropdown>
                </Menu>
              </div>
            </MediaQuery>
            <Link href='/' passHref>
              <a>
                <Group spacing={5}>
                  <NewspaperIcon width={22} className={classes.blackWhie} />
                  <Text
                    ml={3}
                    fw={700}
                    tt={{ base: 'uppercase', xs: 'initial' }}
                    className={classes.blackWhie}
                  >
                    blogs
                  </Text>
                  <MediaQuery smallerThan='xs' styles={{ display: 'none' }}>
                    <Text fw={100}> with T3 Stack</Text>
                  </MediaQuery>
                </Group>
              </a>
            </Link>
            <MediaQuery smallerThan={830} styles={{ display: 'none' }}>
              <Divider orientation='vertical' color='gray' mx={30} />
            </MediaQuery>
            <MediaQuery smallerThan={830} styles={{ display: 'none' }}>
              <Group spacing='xl'>
                {links.map((link, i) => (
                  <Link href={link.path} key={i} passHref>
                    <Text
                      component='a'
                      fz={14}
                      weight={400}
                      className={cx({
                        [classes.menuActive]: router.pathname === link.path,
                        [classes.blackWhie]: router.pathname === link.path,
                      })}
                      py={2}
                      px={5}
                    >
                      {link.label}
                    </Text>
                  </Link>
                ))}
              </Group>
            </MediaQuery>
          </Group>
          <RightSection />
        </Group>
      </Wrapper>
    </Card>
  )
})
MyHeader.displayName = 'MyHeader'
export default MyHeader
