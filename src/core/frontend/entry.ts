import { Application } from "../types";
import { WebpackConfigProps } from "./createWebpackConfig";

function entry({ app, dev }: WebpackConfigProps) {
  return {
    code: `
      import { App } from '${require.resolve('./App')}'
      import { hydrate } from 'emotion'
      import * as React from 'react'
      import { BrowserRouter } from "react-router-dom";
      import { ${dev ? 'render' : 'hydrate'} as render } from 'react-dom'

      hydrate(__CRITICAL_CSS__)
      const routes = [${getRoutes(app)}]

      render(
        React.createElement(
          BrowserRouter,
          {},
          React.createElement(App, { routes: routes, initialData: __INITIAL_DATA__ })
        ),
        document.getElementById('root'),
      )
    `.trim()
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
