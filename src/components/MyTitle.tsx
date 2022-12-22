import React from 'react'
import useHeaderStyles from '@/styles/useHeaderStyles'
import { Box, BoxProps, Divider, Text } from '@mantine/core'

interface Props {
  title: string
  props?: BoxProps
}

const MyTitle: React.FC<Props> = ({ title, props }) => {
  const { classes } = useHeaderStyles()

  return (
    <Box {...props}>
      <Text fw={600} fz='md' className={classes.blackWhie}>
        {title}
      </Text>
      <Divider
        mt={7}
        size='md'
        w={80}
        sx={(theme) => ({
          borderColor: theme.colors.gray[theme.colorScheme === 'dark' ? 7 : 3],
        })}
      />
    </Box>
  )
}

export default MyTitle
