import {
  MantineThemeOverride,
  ColorScheme,
  DefaultMantineColor,
  Tuple,
} from '@mantine/core'

type ExtendedCustomColors = DefaultMantineColor

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}

interface Props {
  colorScheme: ColorScheme
}
const theme = ({ colorScheme }: Props): MantineThemeOverride => ({
  colorScheme,
  fontFamily: 'Sora, sans-serif',
  defaultRadius: 6,
  activeStyles: { transform: 'none' },
  components: {
    Input: {
      defaultProps: {
        radius: 7,
      },
    },
    Indicator: {
      styles: (theme) => ({
        common: {
          color: theme.colorScheme === 'dark' ? '#FFF' : theme.colors.blue[5],
        },
        indicator: {
          background: theme.fn.rgba(
            theme.colors.blue[theme.colorScheme === 'dark' ? 4 : 1],
            0.7
          ),
        },
      }),
    },
    Tooltip: {
      defaultProps: {
        position: 'bottom',
        px: 'sm',
        py: 8,
      },
    },
  },
})
export default theme
