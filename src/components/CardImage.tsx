import React, { memo, useState } from 'react'
import Image from 'next/image'
import useGlobalStyles from '@/styles/useGlobalStyles'
import { AspectRatio, Card, Center, Sx } from '@mantine/core'
import { PhotoIcon } from '@heroicons/react/24/outline'

interface Props {
  url?: string
  ratio: number
  sx?: Sx
}

const CardImage = memo(({ url, ratio, sx }: Props) => {
  const { classes: gClasses } = useGlobalStyles()
  const [noImg, setNoImg] = useState(!url)

  return (
    <AspectRatio ratio={ratio} sx={sx}>
      <Card withBorder radius='lg' className={gClasses.customCardBg}>
        <Card.Section>
          {noImg || !url ? (
            <Center pos='absolute' inset={0}>
              <PhotoIcon width='50%' strokeWidth={0.2} opacity={0.3} />
            </Center>
          ) : (
            <Image
              src={url}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              blurDataURL={url}
              onLoad={() => setNoImg(false)}
              onError={() => setNoImg(true)}
              alt=''
            />
          )}
        </Card.Section>
      </Card>
    </AspectRatio>
  )
})
CardImage.displayName = 'CardImage'
export default CardImage
