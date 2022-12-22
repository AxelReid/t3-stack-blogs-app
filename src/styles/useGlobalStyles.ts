import { createStyles } from '@mantine/core'

const useGlobalStyles = createStyles((theme) => ({
  customCardBg: {
    background:
      theme.colorScheme === 'light' ? theme.colors.gray[0] : 'inherient',
  },
}))
export default useGlobalStyles
