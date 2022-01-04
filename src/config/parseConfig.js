import { readFile } from 'fs/promises';

export function trimPair(str) {
    return str.split('=').map(x => x.trim());
}

export function parseBoolean(str) {
    const map = {
        on: true,
        off: false,
        yes: true,
        no: false,
        true: true,
        false: false,
    }
    const key = Object.keys(map).indexOf(str) >= 0;
    return key ? map[str] : str;
}

export function parseValue(val) {
    const isInt = Number.isInteger(val);
    const isFloat = !isInt && Number.parseFloat(val);
    const isNumberic = isInt || isFloat;
    if (isNumberic) {
        return isFloat || Number.parseInt(val);
    } else {
        return parseBoolean(val);
    }
}

export function makeMap(configString) {
    return configString.split('\n').reduce((map, currentLine) => {
        const notCommentLine = currentLine[0] !== '#';
        const [option, value] = trimPair(currentLine);
        if (notCommentLine) {
            map.set(option, parseValue(value));
        }
        return map;
    }, new Map());
}

export default async function (path) {
    let config;
    try {
        const configs = await readFile(path, 'utf-8');
        config = makeMap(configs);
    } catch (error) {
        console.error(error);
    }
    return config;
};