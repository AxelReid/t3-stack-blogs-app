import useHeaderStyles from '@/styles/useHeaderStyles'
import { trpc } from '@/utils/trpc'
import { NewspaperIcon } from '@heroicons/react/24/outline'
import React, { memo } from 'react'
import IconLink from './IconLink'

const MyBlogsIcon = memo(() => {
  const { classes } = useHeaderStyles()
  const { data } = trpc.blogs.getUserBlogsCount.useQuery(undefined, {
    placeholderData: 0,
  })

  return (
    <IconLink
      icon={<NewspaperIcon width={23} className={classes.blackWhie} />}
      path='/dashboard/my-blogs'
      tooltipLabel='My blogs'
      indicator={data}
    />
  )
})
MyBlogsIcon.displayName = 'MyBlogsIcon'
export default MyBlogsIcon
