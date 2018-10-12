import { themed, ThemedProps } from '../../core/frontend/Theme';
import { spacing, transparent } from "./values";
import { CSSObject } from 'create-emotion';

export interface SpacedProps extends ThemedProps {
  spacing?: number
}

export const verticalSpacedMixin = themed((theme, props: SpacedProps) => ({
  '&:not(:last-child)': {
    marginBottom: spacing(theme, props.spacing || 1)
  }
}))

export const horizontalSpacedMixin = themed((theme, props: SpacedProps) => ({
  '&:not(:last-child)': {
    marginRight: spacing(theme, props.spacing || 1)
  }
}))

export const buttonReset: CSSObject = {
  outline: 'none',
  border: 'none',
  backgroundColor: transparent
}