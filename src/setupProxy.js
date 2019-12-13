// @ts-ignore
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api', {target: 'http://192.168.2.85:13000'}));
  app.use(proxy('/ws', {target: 'http://192.168.2.85:12000'}));
  app.use(proxy('/resource', {target: 'http://192.168.2.85:13000'}));
};
