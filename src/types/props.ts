import { ImagesGetOutput } from '@/utils/trpc-helper'

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>

export interface ImageModalProps {
  selectedImages: ImagesGetOutput | []
  setSelectedImages: SetStateType<ImagesGetOutput>
}
