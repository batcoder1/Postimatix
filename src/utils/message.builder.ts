import * as util from 'util';
import { format } from 'winston';

const {  json, printf } = format;

function isJsonString(data: any): any {
  const str = data.toString();
  return str.startsWith('{') || str.startsWith('"{') || str.startsWith('<ref');
}

function stringify(data: any, index: number) {
  try {
    return `${JSON.stringify(data)}, `;
  } catch (error) {
    return `Error: the object in position [${index}] is malformed, `;
  }
}

function avoidHtmlTags(data: string): string {
  return Array.from(data)
    .map((d) => (d === '<' ? '' : d))
    .join('');
}

function specialCharacter(data: string): string {
  return data.replace('\n', '_').replace('\r', '_');
}

function messageBuilder() {
  return printf((info) => {
    let meta = '';
    for (let index = 0; index < 10; index++) {
      const ele = info[index];
      if (ele) {
        const isJson = isJsonString(util.inspect(ele));
        if (isJson) {
          meta += stringify(ele, index);
        } else {
          meta += info[index];
        }
      }
    }
    meta = specialCharacter(meta);
    meta = avoidHtmlTags(meta);
    return `${info.timestamp} [API] ${info.level}: ${info.message}${
      meta ? `${meta}` : ''
    }`;
  });
}


export { messageBuilder };

