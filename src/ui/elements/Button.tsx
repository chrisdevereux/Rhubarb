import styled from 'react-emotion'
import { themed } from '../../core/frontend/Theme'
import { buttonReset } from '../util/mixins'
import { list, spacing, unitList } from '../util/values'

export const Button = styled('button')(
  buttonReset,
  themed(theme => ({
    padding: unitList('px', spacing(theme, 1), spacing(theme, 2)),
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: unitList(
      'px',
      ...theme.spacing.controlShadow,
      theme.color.control.shadow,
    ),
    border: list('1px', 'solid', theme.color.control.border),
  })),
)
