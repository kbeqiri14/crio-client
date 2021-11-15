const CracoAntDesignPlugin = require('craco-antd');
const CracoAlias = require('craco-alias');

module.exports = {
  devServer: {
    headers: {
      'Cache-Control': 'no-cache',
    }
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            paths: [],
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: './',
      },
    },
  ],
};
