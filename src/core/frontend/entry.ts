import * as serializeJavascript from 'serialize-javascript'
import { Application } from "../types";
import { WebpackConfigProps } from "./createWebpackConfig";

function entry({ app, dev, appProps }: WebpackConfigProps) {
  return {
    code: `
      import { App } from './App'
      import { ClientRouter } from './ClientRouter'
      import { hydrate } from 'emotion'
      import * as React from 'react'
      import { BrowserRouter } from "react-router-dom";
      import { ${dev ? 'render' : 'hydrate'} as render } from 'react-dom'

      hydrate(__CRITICAL_CSS__)
      const routes = [${getRoutes(app)}]

      render(
        React.createElement(
          BrowserRouter,
          ${serializeJavascript(appProps)},
          React.createElement(
            App,
            clientConfiguration,
            React.createElement(
              ClientRouter,
              { routes: routes, initialData: __INITIAL_DATA__ }
            )
          )
        ),
        document.getElementById('root')
      )
    `
  }
}

function getRoutes(app: Application) {
  return app.modules.flatMap(({ pages = [] }) =>
    pages.map(
      ({ pattern, source }) => `
        {
          pattern: "${pattern}",
          source: () => import("${source}")
        }
      `.trim()
    )
  ).join(',')
}

module.exports = entry
