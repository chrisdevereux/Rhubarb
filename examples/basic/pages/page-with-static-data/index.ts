import { createPage, Data } from "../../../../src/core";
import { PageWithStaticDataContent } from './data';

export const pageWithStaticData = createPage<PageWithStaticDataContent>({
  id: 'page-with-static-data',
  pattern: '/page-with-static-data/:name',
  source: require.resolve('./content'),
  data: ({ name }): Data<PageWithStaticDataContent> => Data.of({ name })
})
