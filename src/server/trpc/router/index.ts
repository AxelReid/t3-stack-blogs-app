// src/server/trpc/router/index.ts
import { t } from '../trpc'
import { authRouter } from './auth'
import { blogsRouter } from './blogs'
import { commentsRouter } from './comments'
import { likesRouter } from './likes'
import { imagesRouter } from './images'

export const appRouter = t.router({
  auth: authRouter,
  blogs: blogsRouter,
  comments: commentsRouter,
  likes: likesRouter,
  images: imagesRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
