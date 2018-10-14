import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Button } from './Button'
import { Field } from './Field'

storiesOf('elements > Button', module).add('default', () => (
  <Button onClick={action('click')}>Click me</Button>
))

storiesOf('elements > Field', module).add('default', () => (
  <Field onChange={action('click')} />
))
