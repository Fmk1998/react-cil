const {dev, version} = require('./package');
const fs = require('fs');
const env = process.argv[2] || '';// dev 调试模式

const indexPath = './src/index.tsx';
const data = fs.readFileSync(indexPath);
const index = data.toString().replace(/(\/\* @dynamic (.*?) \*\/\n*\n*\r*\s*\t*)(.*?)(\n*\n*\r*\s*\t*\/\* @dynamic end \*\/)/gi, (a, s1, s2, s3, s4) => {
    let code = '';
    switch (s2) {
        case 'debug':
            code = env === 'dev' ? `import {Debugger} from 'para-lib';` : '/* dynamic 为动态代码注释,请勿删除 */';
            break;
        case 'Debugger':
            code = env === 'dev' ? `await Debugger.init(debug);` : '/* dynamic 为动态代码注释,请勿删除 */';
            break;
        case 'init':
            code = env === 'dev' ? `init(${JSON.stringify(dev.debug || [])})` : 'init();';
            break;
        case 'version':
            code = `window.ParaWeb = {version: '${version}', env: '${env || ''}', buildTime: '${new Date().toLocaleString()}'}`;
            break;
    }
    return `${s1}${code}${s4}`;
});
try {
    fs.writeFileSync(indexPath, index);
} catch (err) {
    console.log(err);
}
console.log('正在启动 react-cli ...');