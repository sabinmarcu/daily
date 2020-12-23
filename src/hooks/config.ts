/* eslint-disable no-underscore-dangle,@typescript-eslint/naming-convention */

let _shouldLog = process.env.NODE_ENV === 'development';
export const enableLog = () => {
  _shouldLog = true;
};
export const disableLog = () => {
  _shouldLog = false;
};
export const shouldLog = () => _shouldLog;

let _prefix = 'app';
export const setPrefix = (value: string) => {
  _prefix = `${value}`;
};
export const prefix = () => _prefix;

// eslint-disable-next-line no-console
export const groupCollapsed = (...args: any[]) => _shouldLog && console.groupCollapsed(...args);
// eslint-disable-next-line no-console
export const groupEnd = () => _shouldLog && console.groupEnd();
// eslint-disable-next-line no-console
export const log = (...args: any[]) => _shouldLog && console.log(...args);

export const logGroup = (message: string, key: string, ...rest: any[]) => {
  groupCollapsed(`${message} %c${key}`, 'color: grey; font-size: 0.9em');
  rest.forEach((it) => {
    if (Array.isArray(it)) {
      log(...it);
    } else {
      log(it);
    }
  });
  groupEnd();
};

const makeMatcher = (pf?: string) => new RegExp(['^', _prefix, ...(typeof pf !== 'undefined' ? [':', pf] : [])].join(''));
export const makeKey = (key: string, pf?: string) => [_prefix, [pf, key].join('')].join(':');
export const isKey = (key: string, pf?: string) => key.match(makeMatcher(pf));
export const stripKey = (key: string, pf?: string) => key
  .replace(makeMatcher(pf), '')
  .replace(/^:/, '');

export const makeType = (type: string) => `###${type}###`;
export const isType = (type: string) => type.match(/^###([^#]+)###$/);

export const logState = (message: string, key: string, value: any) => {
  logGroup(
    message,
    key,
    [`Key: %c${key}`, 'color: blue; text-decoration: underline'],
    [
      `LocalStorage Key: %c${[_prefix, key].join(':')}`,
      'color: blue; text-decoration: underline',
    ],
    ['Value:', value],
  );
};
