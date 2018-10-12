module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [
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
      }
    ],
  },
};
