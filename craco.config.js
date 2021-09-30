const CracoAntDesignPlugin = require('craco-antd');
const CracoAlias = require('craco-alias');

module.exports = {
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
