import React, { memo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  ArrowLeftOnRectangleIcon,
  HeartIcon,
  NewspaperIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import {
  Box,
  Burger,
  createStyles,
  Drawer,
  MantineColor,
  MediaQuery,
  Navbar,
  NavLink,
  ScrollArea,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { signOut } from 'next-auth/react'

const menus = [
  { label: 'Profile', icon: <UserIcon width={20} />, path: '/dashboard' },
  {
    label: 'My blogs',
    icon: <NewspaperIcon width={20} />,
    path: '/dashboard/my-blogs',
  },
  {
    label: 'Liked blogs',
    icon: <HeartIcon width={20} />,
    path: '/dashboard/liked-blogs',
  },
  {
    label: 'Create a blog',
    icon: <PlusIcon width={20} />,
    path: '/dashboard/create-blog',
  },
]

const useStyles = createStyles((theme) => ({
  navRoot: {
    borderRadius: theme.spacing.xs,
  },
  navLabel: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },
  activeBg: {
    background: theme.colorScheme === 'dark' ? 'white' : 'black',
  },
  activeLabel: {
    color: theme.colorScheme === 'dark' ? 'black' : 'white',
  },
}))

const Menus = memo(() => {
  const theme = useMantineTheme()
  const [open, setOpen] = useState(false)

  const main = (
    <Stack spacing={5}>
      {menus.map((menu, i1) => (
        <NavItem {...menu} key={i1} />
      ))}
    </Stack>
  )

  const bottom = (
    <NavItem
      label='Log out'
      icon={<ArrowLeftOnRectangleIcon width={20} />}
      color='red'
      click={() => signOut()}
    />
  )

  return (
    <>
      <Drawer
        overlayColor={
          theme.colorScheme === 'dark' ? theme.black : theme.colors.dark[2]
        }
        overlayOpacity={0.3}
        overlayBlur={3}
        opened={open}
        onClose={() => setOpen(!open)}
      >
        <Navbar withBorder={false} height={'calc(100vh - 60px)'}>
          <Navbar.Section grow component={ScrollArea}>
            <Box px={15}>{main}</Box>
          </Navbar.Section>
          <Navbar.Section pl={15} pt='xs' pr={15}>
            {bottom}
          </Navbar.Section>
        </Navbar>
      </Drawer>
      <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
        <Burger size='sm' opened={open} onClick={() => setOpen(!open)} />
      </MediaQuery>
      <Navbar
        hiddenBreakpoint='sm'
        hidden
        height='calc(100vh - 80px)'
        width={{ base: 200, sm: 225, md: 250 }}
        py='sm'
        pr={3}
        pos='sticky'
        top={89}
      >
        {/* You could have header of navbar if you wished */}
        <Navbar.Section grow component={ScrollArea}>
          <Box pr={15}>{main}</Box>
        </Navbar.Section>
        <Navbar.Section pt='xs' pr={15}>
          {bottom}
        </Navbar.Section>
      </Navbar>
    </>
  )
})
Menus.displayName = 'Menus'

interface ItemProps {
  label: string
  icon: React.ReactNode
  path?: string
  color?: MantineColor
  click?: () => void
}
const NavItem: React.FC<ItemProps> = ({ label, icon, path, color, click }) => {
  const router = useRouter()
  const active = router.pathname === path
  const { classes } = useStyles()

  if (path) {
    return (
      <Link href={path} passHref>
        <NavLink
          component='a'
          py='sm'
          classNames={{ label: classes.navLabel, root: classes.navRoot }}
          label={label}
          icon={icon}
          variant={color ? 'filled' : 'light'}
          color={color || 'blue'}
          active={active}
        />
      </Link>
    )
  }
  return (
    <NavLink
      py='sm'
      classNames={{ label: classes.navLabel, root: classes.navRoot }}
      label={label}
      icon={icon}
      color={color || 'cyan'}
      onClick={() => (typeof click === 'function' ? click() : null)}
      active={!!color}
    />
  )
}

export default Menus
