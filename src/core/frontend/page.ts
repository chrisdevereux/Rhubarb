import { Application, Page } from '../types';

interface PageBundle extends Page {
  bundleId: string
}

export function getPageBundles(app: Application): PageBundle[] {
  return app.modules.flatMap(({ id, pages = [] }) =>
    pages.map(page => ({
      ...page,
      bundleId: `${id}.${page.id}`
    }))
  )
}
