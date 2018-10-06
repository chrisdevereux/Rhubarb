import { createApplication } from '../../src/core/bootstrap/createApp';

export default createApplication({
  modules: [
    {
      id: 'basic-module',
      pages: [
        {
          id: 'basic-page',
          pattern: '/',
          source: require.resolve('./page')
        }
      ]
    }
  ]
})
