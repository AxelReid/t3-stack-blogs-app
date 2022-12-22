import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const commentsRouter = t.router({
  getByBlogId: t.procedure
    .input(
      z.object({
        blogId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { blogId } = input
      return await ctx.prisma.comments.findMany({
        where: { blogId },
        select: {
          id: true,
          comment: true,
          createdAt: true,
          User: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
    }),
  add: authedProcedure
    .input(
      z.object({
        comment: z.string(),
        blogId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.comments.create({
        data: {
          userId: ctx.session.user.id,
          blogId: input.blogId,
          comment: input.comment,
        },
      })

      return 'Comment added'
    }),
  update: authedProcedure
    .input(z.object({ commentId: z.string(), comment: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const theComment = await ctx.prisma.comments.findFirst({
        where: { id: input.commentId },
      })
      if (!theComment)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Comment not found' })
      if (theComment.userId !== ctx.session.user.id)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update your own comments',
        })
      const { comment } = input
      await ctx.prisma.comments.update({
        where: { id: input.commentId },
        data: {
          ...(!comment || comment === theComment.comment ? {} : { comment }),
        },
      })
    }),
  delete: authedProcedure
    .input(z.object({ id: z.string(), userId: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      if (input.userId !== ctx.session.user.id)
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own comments',
        })
      await ctx.prisma.comments.delete({ where: { id: input.id } })
      return 'Comment removed'
    }),
})
