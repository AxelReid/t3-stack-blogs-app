import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

const allImagesOutput = {
  id: true,
  title: true,
  images: { where: { thumbnail: true }, select: { url: true } },
  createdAt: true,
  _count: { select: { comments: true, likes: true } },
  user: { select: { name: true, image: true } },
}
export const blogsRouter = t.router({
  create: authedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        body: z.string(),
        private: z.boolean().default(false),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, description, body, private: pm } = input
      const newBlog = await ctx.prisma.blogs.create({
        data: {
          title,
          description,
          body,
          userId: ctx.session?.user?.id,
          private: pm,
        },
      })
      return newBlog
    }),
  updateBlog: authedProcedure
    .input(
      z.object({
        blogId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        body: z.string().optional(),
        private: z.boolean().default(false),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const theBlog = await ctx.prisma.blogs.findFirst({
        where: { id: input.blogId },
      })
      if (!theBlog)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Blog not exist' })
      if (theBlog.userId !== ctx.session.user.id)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update your own blogs',
        })
      const { blogId, title, description, body, private: pm } = input
      await ctx.prisma.blogs.update({
        where: { id: blogId },
        data: {
          ...(!title || theBlog.title === title ? {} : { title }),
          ...(theBlog.description === description ? {} : { description }),
          ...(!body || theBlog.body === body ? {} : { body }),
          private: theBlog.private === pm ? theBlog.private : pm,
        },
      })
      return 'Updated successfully'
    }),
  deleteBlog: authedProcedure
    .input(z.object({ blogId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const isExist = await ctx.prisma.blogs.findFirst({
        where: { id: input.blogId },
      })
      if (!isExist)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'The blog is not exist',
        })
      else if (isExist.userId !== ctx.session.user.id)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own blog',
        })
      else await ctx.prisma.blogs.delete({ where: { id: input.blogId } })

      return 'Deleted successfully'
    }),
  getAll: t.procedure.query(({ ctx }) =>
    ctx.prisma.blogs.findMany({
      where: { private: false },
      select: allImagesOutput,
    })
  ),
  getOne: t.procedure
    .input(z.object({ blogId: z.string() }))
    .query(async ({ input, ctx }) => {
      const aBlog = await ctx.prisma.blogs.findFirst({
        where: { id: input.blogId, private: false },
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
      return aBlog
    }),
  getUserBlogToEdit: authedProcedure
    .input(z.object({ blogId: z.string() }))
    .query(
      async ({ input, ctx }) =>
        await ctx.prisma.blogs.findFirst({
          where: { id: input.blogId },
          select: {
            id: true,
            title: true,
            description: true,
            body: true,
            private: true,
            images: { select: { imageId: true, url: true, thumbnail: true } },
          },
        })
    ),
  getUserBlogs: authedProcedure.query(
    async ({ ctx }) =>
      await ctx.prisma.blogs.findMany({
        where: { userId: ctx.session.user.id },
        select: allImagesOutput,
      })
  ),
  getUserBlogsCount: t.procedure.query(async ({ ctx }) => {
    if (!ctx.session) return 0
    return await ctx.prisma.blogs.count({
      where: { userId: ctx?.session?.user?.id },
    })
  }),
  getLikedBlogs: authedProcedure.query(({ ctx }) =>
    ctx.prisma.blogs.findMany({
      where: { likes: { some: { userId: ctx.session.user.id } } },
      select: allImagesOutput,
    })
  ),
  getUserLikedBlogsCount: t.procedure.query(async ({ ctx }) => {
    if (!ctx.session) return 0
    return await ctx.prisma.blogs.count({
      where: { likes: { some: { userId: ctx?.session?.user?.id } } },
    })
  }),
  otherBlogs: t.procedure
    .input(
      z.object({
        userId: z.string(),
        blogId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { userId, blogId } = input

      const select = {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        _count: { select: { likes: true, comments: true } },
      }

      const usersOtherBlogs = await ctx.prisma.blogs.findMany({
        where: { userId, id: { not: blogId } },
        select,
        orderBy: { likes: { _count: 'desc' } },
        take: 3,
      })

      if (usersOtherBlogs.length >= 1) {
        return {
          key: 'user',
          title: "Blogger's popular blogs",
          data: usersOtherBlogs,
        }
      } else {
        const otherBlogs = await ctx.prisma.blogs.findMany({
          where: { id: { not: blogId } },
          select,
          orderBy: { likes: { _count: 'desc' } },
          take: 3,
        })
        return { key: 'popular', title: 'Popular blogs', data: otherBlogs }
      }
    }),
  filterBlogs: t.procedure
    .input(
      z.object({
        sort: z.enum(['new', 'popular', 'recommended']).default('new'),
        page: z.number().default(1),
        count: z.number().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { sort, count, page } = input

      const filteredBlogs = await ctx.prisma.blogs.findMany({
        where: { private: false },
        orderBy:
          sort === 'new'
            ? { createdAt: 'asc' }
            : sort === 'popular'
            ? { likes: { _count: 'asc' /* views: { _count: 'asc' }*/ } }
            : sort === 'recommended'
            ? [{ likes: { _count: 'asc' } }, { comments: { _count: 'asc' } }]
            : undefined,
        skip: page === 1 ? 0 : page * count - count,
        take: count,
        select: allImagesOutput,
      })
      return filteredBlogs
    }),
  firstBlog: t.procedure.query(
    async ({ ctx }) =>
      await ctx.prisma.blogs.findFirst({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          images: { where: { thumbnail: true }, select: { url: true } },
          user: { select: { name: true, image: true } },
        },
      })
  ),
})
