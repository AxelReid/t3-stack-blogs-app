import React from 'react'
import dynamic from 'next/dynamic'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/server/db/client'
import { BlogDetailsOutput } from '@/utils/trpc-helper'
import MyHeader from '@/components/MyHeader'
import Wrapper from '@/components/Wrapper'
import BlogNotFound from '@/components/BlogNotFound'
import BlogDetails from '@/components/BlogDetails'
import { Group, Stack } from '@mantine/core'
import UserOtherBlogs from '@/components/BlogDetails/UserOtherBlogs'

const Comments = dynamic(() => import('@/components/BlogDetails/Comments'))

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await prisma.blogs.findMany({ take: 10, select: { id: true } })
  const paths = blogs.map((id) => ({ params: id }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogId: unknown = params?.id

  if (!blogId) return { props: { blog: null, error: null, status: 400 } }
  try {
    const blogRes = await prisma.blogs.findFirst({
      where: { id: blogId, private: false },
      select: {
        id: true,
        title: true,
        description: true,
        body: true,
        createdAt: true,
        images: {
          select: {
            id: true,
            url: true,
            thumbnail: true,
            image: { select: { width: true, height: true } },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            _count: { select: { Blogs: true } },
          },
        },
        _count: { select: { comments: true, likes: true } },
      },
    })

    if (blogRes)
      return {
        props: {
          blog: {
            ...blogRes,
            createdAt: blogRes?.createdAt.toDateString() || null,
          },
          error: null,
          status: 200,
        },
      }
    else return { props: { blog: null, error: null, status: 404 } }
  } catch (error) {
    return { props: { blog: null, error: error, status: 500 } }
  }
}

interface Props {
  blog: BlogDetailsOutput
  error: null | unknown
  status: 200 | 400 | 404 | 500
}

const Blog = ({ blog, error, status }: Props) => {
  return (
    <div>
      <MyHeader />
      <Wrapper>
        {status === 404 ? (
          <BlogNotFound />
        ) : status === 400 ? (
          'something wrong, not my fault!'
        ) : status === 500 ? (
          'error'
        ) : blog ? (
          <div>
            <Group align='start' spacing={35} mt={60}>
              <BlogDetails blog={blog} />
              <Stack
                pos={{ md: 'sticky' }}
                top={100}
                w={{ base: '100%', md: 300, lg: 350 }}
              >
                <UserOtherBlogs
                  name={blog?.user.name}
                  userId={blog?.user.id}
                  blogId={blog?.id}
                />
              </Stack>
            </Group>
            <Comments blogId={blog.id} />
          </div>
        ) : null}
      </Wrapper>
    </div>
  )
}

export default Blog
