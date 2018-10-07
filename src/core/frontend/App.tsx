import * as React from "react";
import { Route, Switch } from "react-router";

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

export function App({ routes, initialData }: AppProps) {
  return (
    <Switch>
    {
      routes.map(({ pattern, source }) => (
        <Route key={pattern} path={pattern}>
          <RouteComponent
            route={source}
            pattern={pattern}
            data={initialData}
          />
        </Route>
      ))
    }
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

export class RouteComponent extends React.Component<RouteComponentProps, RouteComponentState> {
  static async preload(props: { pattern: string, route: AsyncRoute }) {
    let route = RouteComponent.cache.get(props.pattern)
    if (route) {
      return route
    }

    route = await props.route().then(r => r.default)
    RouteComponent.cache.set(props.pattern, route)

    return route
  }

  private static cache = new Map<string, PageComponent>()

  state: RouteComponentState = {
    route: RouteComponent.cache.get(this.props.pattern)
  }

  async componentDidMount() {
    this.setState({ route: await RouteComponent.preload(this.props) })
  }

  render() {
    if (!this.state.route) {
      console.warn(`Page bundle for ${this.props.pattern} has not yet been loaded`)
    }
console.log(this.state.route)
    return this.state.route && <this.state.route data={this.props.data} /> || null
  }
}

