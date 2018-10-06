import { extractCritical } from 'emotion-server'
import * as express from 'express';
import * as React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { StaticRouter, StaticRouterContext } from 'react-router'
import * as serialize from 'serialize-javascript'
import { Application } from '../types';
import { App, RouteComponent } from './App';
import { getPageBundles } from './page';

export async function createPageServer(app: Application) {
  const server = express()
  const routes = getPageBundles(app).map(({ pattern, source }) => ({
    pattern,
    source: async () => require(source)
  }))

  await Promise.all(
    routes.map(async (route) => {
      await RouteComponent.preload({
        pattern: route.pattern,
        route: route.source
      })

      server.get(route.pattern, (req, res) => {
        const context: StaticRouterContext & { status?: number } = {}
        const { html, ids, css } = extractCritical(
          renderToString(
            <StaticRouter location={req.baseUrl}>
              <App routes={routes} />
            </StaticRouter>
          ),
        )
  
        if (context.url) {
          return res.redirect(context.url)
        }
  
        const helmet = Helmet.renderStatic()
        
        const document = (
          '<!DOCTYPE html>' +
          renderToStaticMarkup(
            <html {...helmet.htmlAttributes.toComponent()}>
              <head>
                <meta charSet="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                {helmet.meta.toComponent()}
                <link rel="shortcut icon" href="/favicon.ico" />
                <style dangerouslySetInnerHTML={{ __html: css }} />
                {helmet.link.toComponent()}
                {helmet.title.toComponent()}
              </head>
              <body {...helmet.bodyAttributes.toComponent()}>
                <div
                  id="root"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </body>
              <script
                dangerouslySetInnerHTML={{
                  __html: `__CRITICAL_CSS__=${serialize(ids)}`,
                }}
              />
              <script defer src="/bundle.js" />
            </html>
          )
        )

        res.writeHead(context.status || 200, {
          'content-type': 'text/html'
        })
        res.write(document)
        res.end()
      })
    })
  )

  return server
}
