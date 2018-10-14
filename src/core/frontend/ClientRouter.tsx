import * as React from 'react'
import { Route, Switch } from 'react-router'

interface AppProps {
  routes: RouteDescriptor[]
  initialData: {}
}

export interface RouteDescriptor {
  pattern: string
  source: AsyncRoute
}

type AsyncRoute = () => Promise<{ default: PageComponent }>
type PageComponent<Data = any> = React.ComponentType<{ data: Data }>

export function ClientRouter({ routes, initialData }: AppProps) {
  return (
    <Switch>
      {routes.map(({ pattern, source }) => (
        <Route key={pattern} path={pattern}>
          <ClientRoute route={source} pattern={pattern} data={initialData} />
        </Route>
      ))}
    </Switch>
  )
}

interface RouteComponentProps {
  pattern: string
  route: AsyncRoute
  data: {}
}

interface RouteComponentState {
  route?: PageComponent
}

export class ClientRoute extends React.Component<
  RouteComponentProps,
  RouteComponentState
> {
  static async preload(props: { pattern: string; route: AsyncRoute }) {
    let route = ClientRoute.cache.get(props.pattern)
    if (route) {
      return route
    }

    route = await props.route().then(r => r.default)
    ClientRoute.cache.set(props.pattern, route)

    return route
  }

  private static cache = new Map<string, PageComponent>()

  state: RouteComponentState = {
    route: ClientRoute.cache.get(this.props.pattern),
  }

  async componentDidMount() {
    this.setState({ route: await ClientRoute.preload(this.props) })
  }

  render() {
    if (!this.state.route) {
      throw Error(
        `Page bundle for ${this.props.pattern} has not yet been loaded`,
      )
    }

    return (
      (this.state.route && <this.state.route data={this.props.data} />) || null
    )
  }
}
