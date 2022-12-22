import { createStyles } from '@mantine/core'

const useHeaderStyles = createStyles((theme) => ({
  root: {
    zIndex: 100,
    overflow: 'visible',
    background: theme.colorScheme === 'dark' ? '#1E1E1E' : '#FFFFFF',
    borderTop: 0,
    borderInline: 0,
  },
  blackWhie: {
    color: theme.colorScheme === 'dark' ? 'white' : 'black',
  },
  menuActive: {
    fontWeight: 700,
    borderBottom: `2px solid ${
      theme.colorScheme === 'dark' ? 'white' : 'black'
    }`,
  },
  btn: {
    background: theme.colorScheme === 'dark' ? 'white' : 'black',
    color: theme.colorScheme === 'dark' ? 'black' : 'white',
    '&:hover': {
      background:
        theme.colorScheme === 'dark'
          ? theme.colors.gray[1]
          : theme.colors.dark[5],
    },
  },
  btnDarker: {
    background: theme.colorScheme === 'dark' ? theme.colors.gray[8] : 'black',
    color: 'white',
  },
}))
export default useHeaderStyles
