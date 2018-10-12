import { CSSObject } from "create-emotion";

export interface Theme {
  color: {
    background: {
      primary: string
      contrast: string
    }
    control: {
      border: string
      shadow: string
    }
    typeography: {
      primary: string
    }
  },
  spacing: {
    unit: number
    controlShadow: number[]
  },
}

export interface ThemedProps {
  theme?: Theme
}

export const defaultTheme: Theme = {
  color: {
    background: {
      primary: 'white',
      contrast: 'hotpink'
    },
    control: {
      border: 'lightgray',
      shadow: 'rgba(0,0,0,0.2)'
    },
    typeography: {
      primary: 'black'
    }
  },
  spacing: {
    unit: 5,
    controlShadow: [1, 1, 5]
  }
}

export function themed<Props>(
  style: (theme: Theme, props: Props) => CSSObject
): <T extends Props>(props: T & ThemedProps) => CSSObject {
  return ({ theme, ...props }: any) => style(theme, props)
}
