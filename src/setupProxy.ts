// @ts-ignore
const proxy = require("http-proxy-middleware");

module.exports = function (app: { use: (arg0: any) => void; }) {
    app.use(proxy('/api', {target: 'http://192.168.2.94:3000'}));
    app.use(proxy('/ws', {target: 'http://192.168.2.94:3000'}));
    app.use(proxy('/resource', {target: 'http://192.168.2.94:3000'}));
};
