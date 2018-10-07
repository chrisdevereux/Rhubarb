import { createPage } from "../../../../src/core";

export const staticPage = createPage({
  id: 'static-page',
  pattern: '/static-page',
  source: require.resolve('./content'),
})
