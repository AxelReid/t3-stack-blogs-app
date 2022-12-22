import useHeaderStyles from '@/styles/useHeaderStyles'
import { trpc } from '@/utils/trpc'
import { HeartIcon } from '@heroicons/react/24/outline'
import React, { memo } from 'react'
import IconLink from './IconLink'

const MyLikedBlogsIcon = memo(() => {
  const { classes } = useHeaderStyles()

  const { data } = trpc.blogs.getUserLikedBlogsCount.useQuery(undefined, {
    placeholderData: 0,
  })

  return (
    <IconLink
      icon={<HeartIcon width={23} className={classes.blackWhie} />}
      path='/dashboard/liked-blogs'
      tooltipLabel='Liked blogs'
      indicator={data}
    />
  )
})
MyLikedBlogsIcon.displayName = 'MyLikedBlogsIcon'
export default MyLikedBlogsIcon
