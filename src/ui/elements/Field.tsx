import styled from "react-emotion";
import { themed } from '../../core/frontend/Theme';
import { spacing, list } from '../util/values';

export const Field = styled('input')(
  themed(theme => ({
    outline: 'none',
    padding: spacing(theme, 1),
    border: list('1px', 'solid', theme.color.control.border)
  }))
)