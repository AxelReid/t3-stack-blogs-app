import '../styles/globals.css'
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from '@mantine/core'
import { SessionProvider } from 'next-auth/react'
import theme from '../styles/theme'
import type { Session } from 'next-auth'
import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import { RouterTransition } from '@/components/RouterTransition'

const MyApp: AppType<{
  session: Session | null
}> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(newColorScheme)
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
          theme={theme({ colorScheme })}
        >
          <RouterTransition />
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}
export default trpc.withTRPC(MyApp)
