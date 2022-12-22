import useGlobalStyles from '@/styles/useGlobalStyles'
import { AspectRatio, Card } from '@mantine/core'
import React from 'react'

const Skeleton = () => {
  const { classes: gClasses } = useGlobalStyles()

  return (
    <AspectRatio w={270} ratio={3 / 4}>
      <Card radius='lg' withBorder className={gClasses.customCardBg}>
        <></>
      </Card>
    </AspectRatio>
  )
}

export default Skeleton
