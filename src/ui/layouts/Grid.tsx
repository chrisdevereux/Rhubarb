import { AlignItemsProperty } from 'csstype';
import styled from 'react-emotion'
import { horizontalSpacedMixin, SpacedProps, verticalSpacedMixin } from '../util/mixins';

interface GridProps extends SpacedProps {
  alignV?: Alignment
  alignH?: Alignment
}

type Alignment = 'start' | 'end' | 'center' | 'stretch'

export const Rows = styled('div')(
  ({ alignV, alignH }: GridProps) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: getAlignment(alignH),
    justifyContent: getAlignment(alignV)
  }),
  verticalSpacedMixin,
)

export const Columns = styled('div')(
  ({ alignV, alignH }: GridProps) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: getAlignment(alignV),
    justifyContent: getAlignment(alignH)
  }),
  horizontalSpacedMixin,
)

function getAlignment(alignment?: Alignment): AlignItemsProperty | undefined {
  if (alignment === 'start') {
    return 'flex-start'
  }

  if (alignment === 'end') {
    return 'flex-end'
  }
  
  return alignment
}
