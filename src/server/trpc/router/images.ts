import { z } from 'zod'
import { authedProcedure, t } from '../trpc'

export const imagesRouter = t.router({
  create: authedProcedure
    .input(
      z.object({
        id: z.string(),
        url: z.string(),
        bytes: z.number(),
        format: z.string(),
        width: z.number(),
        height: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, url, bytes, format, width, height } = input
      await ctx.prisma.userImages.create({
        data: {
          id,
          url,
          bytes,
          format,
          width,
          height,
          userId: ctx.session.user.id,
        },
      })
      return 'Image created'
    }),
  add: authedProcedure
    .input(
      z.object({
        imageId: z.string(),
        blogId: z.string(),
        url: z.string(),
        thumbnail: z.boolean().default(false),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { imageId, blogId, thumbnail, url } = input
      await ctx.prisma.images.create({
        data: { imageId, thumbnail, blogId, url },
      })
      return 'Image added'
    }),
  getAll: authedProcedure.query(async ({ ctx }) => {
    // get by user id - ctx.session.user.id
    const userImages = await ctx.prisma.userImages.findMany({
      where: { userId: ctx.session.user.id },
      select: { id: true, url: true },
    })
    return userImages
  }),
})
