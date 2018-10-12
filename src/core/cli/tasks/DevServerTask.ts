import * as webpack from 'webpack'
import * as DevServer from 'webpack-dev-server'
import { createPageServer } from '../../frontend/createPageServer';
import { createWebpackConfig } from '../../frontend/createWebpackConfig';
import { Task } from './Task';

export class DevServerTask extends Task {
  packager = webpack(
    createWebpackConfig({
      dev: true,
      app: this.app,
      appProps: {
        theme: this.app.theme
      }
    })
  )

  async start() {
    const pageServer = await createPageServer(this.app)
    const devserver = new DevServer(this.packager, {
      before: server => {
        server.use(pageServer)
      },
      hot: true,
    })

    devserver.listen(3000)
  }
}
