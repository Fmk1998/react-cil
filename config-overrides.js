const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.output.publicPath = './';
  config.plugins.push(new MonacoWebpackPlugin({
    languages: ['typescript']
  }));
  config.resolve.alias['react'] = path.resolve('./node_modules/react');
  return config;
};
