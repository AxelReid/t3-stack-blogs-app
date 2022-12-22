import React, { useState } from 'react'
import DashboardWrapper from '@/components/dashboard/DashboardWrapper'
import { Modal, ScrollArea, Table, useMantineTheme } from '@mantine/core'
import MyBlogItem from '@/components/blogItem/MyBlogItem'
import { trpc } from '@/utils/trpc'
import Edit from '@/components/dashboard/Edit'

const MyBlogs = () => {
  const { data, refetch } = trpc.blogs.getUserBlogs.useQuery()
  const theme = useMantineTheme()
  const [blogId, setBlogId] = useState<string>('')

  return (
    <DashboardWrapper>
      <Modal
        title='Update'
        size={1000}
        onClose={() => setBlogId('')}
        opened={!!blogId}
        overlayColor={
          theme.colorScheme === 'dark' ? theme.black : theme.colors.dark[2]
        }
        overlayOpacity={0.3}
        overlayBlur={3}
      >
        <Edit blogId={blogId} refetch={refetch} />
      </Modal>
      <ScrollArea offsetScrollbars>
        <Table highlightOnHover verticalSpacing='sm' horizontalSpacing='sm'>
          <thead>
            <tr>
              <th>Name/Image</th>
              <th>Date</th>
              <th>Stats</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((blog) => (
              <MyBlogItem
                edit={() => setBlogId(blog.id)}
                key={blog.id}
                {...blog}
              />
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </DashboardWrapper>
  )
}

export default MyBlogs
