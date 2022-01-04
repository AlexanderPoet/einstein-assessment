import parseConfig from './src/config/parseConfig.js';

const configPath = './src/config/configuration.txt'; // 

(async function () {
    const configOptions = await parseConfig(configPath)
    console.log(configOptions)
})();