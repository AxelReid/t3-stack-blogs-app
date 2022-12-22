import { ActionIcon, Indicator, Tooltip } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const IconLink: React.FC<{
  tooltipLabel: React.ReactNode
  path?: string
  click?: () => void
  icon: React.ReactNode
  indicator?: number
}> = ({ tooltipLabel, path, icon, click, indicator }) => {
  const children = path ? (
    <Link href={path} passHref>
      <ActionIcon component='a' size='lg' radius='xl'>
        {icon}
      </ActionIcon>
    </Link>
  ) : (
    <ActionIcon
      size='lg'
      radius='xl'
      onClick={() => (typeof click === 'function' ? click() : null)}
    >
      {icon}
    </ActionIcon>
  )

  return (
    <Tooltip
      label={tooltipLabel}
      styles={(theme) => ({
        tooltip: {
          background: theme.colors.dark[theme.colorScheme === 'dark' ? 4 : 6],
        },
      })}
    >
      {indicator ? (
        <Indicator offset={4} label={indicator} size={20} withBorder>
          {children}
        </Indicator>
      ) : (
        children
      )}
    </Tooltip>
  )
}

export default IconLink
