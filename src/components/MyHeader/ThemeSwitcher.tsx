import useHeaderStyles from '@/styles/useHeaderStyles'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { Group, Text, useMantineColorScheme } from '@mantine/core'
import React from 'react'
import IconLink from './IconLink'

const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { classes } = useHeaderStyles()
  return (
    <IconLink
      click={() => toggleColorScheme()}
      tooltipLabel={
        <Group spacing={7} align='center'>
          <Text>{colorScheme === 'dark' ? 'Light theme' : 'Dark theme'} </Text>
          <Text c='gray.4' fz='xs' fw={500}>
            CTRL + J
          </Text>
        </Group>
      }
      icon={
        colorScheme === 'dark' ? (
          <SunIcon width={23} className={classes.blackWhie} />
        ) : (
          <MoonIcon width={23} className={classes.blackWhie} />
        )
      }
    />
  )
}

export default ThemeSwitcher
