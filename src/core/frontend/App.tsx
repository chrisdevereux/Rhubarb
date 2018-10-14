import { ThemeProvider } from 'emotion-theming'
import * as React from 'react'
import { Theme } from './Theme'

export interface AppProps {
  theme: Theme
  children?: React.ReactNode
}

export function App(props: AppProps) {
  return <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
}
