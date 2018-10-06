import * as React from "react";
import { Route, Switch } from "react-router";

interface AppProps {
  routes: RouteDescriptor[]
}

export interface RouteDescriptor {
  pattern: string
  source: AsyncRoute
}

type AsyncRoute = () => Promise<{ default: React.ComponentType }>

export function App({ routes }: AppProps) {
  return (
    <Switch>
    {
      routes.map(({ pattern, source }) => (
        <Route key={pattern} path={pattern}>
          <RouteComponent
            route={source}
            pattern={pattern}
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
}

interface RouteComponentState {
  route?: React.ComponentType
}

export class RouteComponent extends React.Component<RouteComponentProps, RouteComponentState> {
  static async preload(props: RouteComponentProps) {
    let route = RouteComponent.cache.get(props.pattern)
    if (route) {
      return route
    }

    route = await props.route().then(r => r.default)
    RouteComponent.cache.set(props.pattern, route)

    return route
  }

  private static cache = new Map<string, React.ComponentType>()

  state: RouteComponentState = {
    route: RouteComponent.cache.get(this.props.pattern)
  }

  async componentDidMount() {
    this.setState({ route: await RouteComponent.preload(this.props) })
  }

  render() {
    return this.state.route && <this.state.route /> || null
  }
}

