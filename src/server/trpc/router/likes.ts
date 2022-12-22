import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const likesRouter = t.router({
  get: t.procedure
    .input(z.object({ blogId: z.string() }))
    .query(async ({ input, ctx }) => {
      const count = await ctx.prisma.like.count({
        where: { blogId: input.blogId },
      })
      const isLiked = await ctx.prisma.like.count({
        where: {
          blogId: input.blogId,
          userId: ctx?.session?.user?.id,
        },
      })

      return { count, isLiked: ctx.session ? !!isLiked : false }
    }),
  toggle: authedProcedure
    .input(z.object({ blogId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { blogId } = input
      const blogExist = await ctx.prisma.blogs.findFirst({
        where: { id: blogId },
      })
      if (!blogExist)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Blog not exist' })

      const hasLiked = await ctx.prisma.like.findFirst({
        where: { userId: ctx.session.user.id, blogId },
      })

      if (!hasLiked) {
        await ctx.prisma.like.create({
          data: { userId: ctx.session.user.id, blogId },
        })
        return 'Liked'
      }
      await ctx.prisma.like.delete({ where: { id: hasLiked.id } })
      return 'Removed like'
    }),
})
