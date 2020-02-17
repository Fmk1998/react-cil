const {dev, version} = require('./package');
const {spawn} = require('child_process');
const {promises: fs} = require('fs');
const env = process.argv[2] || '';// dev 调试模式

const runReact = () => {
    let ls;
    if (env === 'dev')
        ls = spawn('cross-env', [`PORT=${dev.port || 8088}`, 'react-scripts', 'start']);
    else
        ls = spawn('react-scripts', ['build']);

    ls.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    ls.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    ls.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`);
    });
};

const indexPath = './src/index.tsx';
const init = async () => {
    const data = await fs.readFile(indexPath);
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
                code = env === 'dev' ? `init(${JSON.stringify(dev.debug || [])})` : 'init()';
                break;
            case 'version':
                code = `window.ParaWeb = {version: '${version}',env: ${env || '\'\''}, buildTime: '${new Date().toLocaleString()}'}`;
                break;
        }
        return `${s1}${code}${s4}`;
    });
    try {
        await fs.writeFile(indexPath, index);
        runReact();
    } catch (err) {
        console.log(err);
    }
};

init();