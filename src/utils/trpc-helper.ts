import { AppRouter } from '@/server/trpc/router'
import { GetInferenceHelpers } from '@trpc/server'

type AppRouterTypes = GetInferenceHelpers<AppRouter>

type ImagesInfer = AppRouterTypes['images']
export type ImagesGetOutput = ImagesInfer['getAll']['output']

type BlogsInfer = AppRouterTypes['blogs']
export type BlogOutput = BlogsInfer['getAll']['output'][0]
export type BlogDetailsOutput = BlogsInfer['getOne']['output']

type CommentInfer = AppRouterTypes['comments']
export type CommentOutput = CommentInfer['getByBlogId']['output'][0]
