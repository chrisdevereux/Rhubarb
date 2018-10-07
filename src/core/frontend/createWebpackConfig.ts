import { resolve } from 'path'
import * as webpack from 'webpack'
import { Application } from '../types'

export interface WebpackConfigProps {
  app: Application
  dev: boolean
}

export function createWebpackConfig({ dev, app }: WebpackConfigProps): webpack.Configuration {
  const entry = require.resolve('./entry')

  return {
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'inline-source-map' : undefined,

    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
  
    module: {
      rules: [
        
        {
          test: entry,
          loaders: [
            {
              loader: require.resolve('val-loader'),
              options: {
                app,
                dev
              }
            },
            {
              loader: require.resolve('ts-loader'),
              options: {
                configFile: 'tsconfig.json',
                transpileOnly: true,
              },
            },
          ]
        },
        {
          test: /\.tsx?$/,
          loader: require.resolve('ts-loader'),
          exclude: /node_modules/,
          options: {
            configFile: 'tsconfig.json',
            transpileOnly: true,
          },
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 8192,
              },
            },
            {
              loader: require.resolve('image-webpack-loader'),
              options: {
                disable: true,
              },
            },
          ],
        },
      ]
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    entry
  }
}