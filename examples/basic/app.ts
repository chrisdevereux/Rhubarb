import { createApplication } from '../../src/core';
import { pageWithStaticData } from './pages/page-with-static-data';
import { staticPage } from './pages/static-page';

export default createApplication({
  modules: [
    {
      id: 'basic-module',
      pages: [
        pageWithStaticData,
        staticPage
      ]
    }
  ]
})
