import * as React from 'react'
import { PageProps } from '../../../../src/ui';
import { PageWithStaticDataContent } from './data';

export default function Page(props: PageProps<PageWithStaticDataContent>) {
  return <div>Hello, {props.data.name}!</div>
}
