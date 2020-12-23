import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import {
  logGroup,
  logState,
  makeKey,
  isKey,
} from './config';
import { usePrevious } from './usePrevious';

export const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] => {
  const prevKey = usePrevious(key);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [value, setValue] = useState<T>();
  useEffect(() => {
    if (!initialLoad || prevKey !== key) {
      const val = localStorage.getItem(makeKey(key));
      if (val) {
        try {
          logState('⚙ LocalStorage Get', key, val);
          setValue(JSON.parse(val));
        } catch {
          logState('❌ Could not parse LS data', key, val);
          setValue(defaultValue);
        }
      } else {
        setValue(defaultValue);
      }
      setInitialLoad(true);
    }
  }, [initialLoad, key, defaultValue]);
  useEffect(() => {
    if (!initialLoad) {
      return undefined;
    }
    let shouldUpdate = true;
    try {
      let existingValue: string | T | null = localStorage.getItem(makeKey(key));
      try {
        existingValue = JSON.parse(existingValue as string);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        if (existingValue && existingValue === value) {
          shouldUpdate = false;
        }
      }
    } finally {
      if (shouldUpdate) {
        if (typeof value === 'undefined') {
          logState('⚙ LocalStorage Remove', key, value);
          localStorage.removeItem(makeKey(key));
        } else {
          logState('⚙ LocalStorage Set', key, value);
          const evt = document.createEvent('StorageEvent');
          // @ts-ignore
          evt.initStorageEvent(
            'storage',
            false, false,
            makeKey(key),
            null,
            JSON.stringify(value),
            window.location,
            window.localStorage,
          );
          window.dispatchEvent(evt);
        }
      }
    }
    return undefined;
  }, [key, value, initialLoad]);
  useEffect(() => {
    const handler = ({
      storageArea,
      key: k,
      oldValue,
      newValue,
    }: StorageEvent) => {
      if (!k) {
        return;
      }
      const isValidKey = isKey(k);
      const isLocalStorage = storageArea === localStorage;
      const isRightKey = k === makeKey(key);
      if (!(isLocalStorage && isValidKey && isRightKey)) {
        return;
      }
      try {
        const [ov, nv] = [JSON.parse(oldValue!), JSON.parse(newValue!)];
        logGroup(
          '⚙ LocalStorage Event',
          key,
          [`Old Value: %c${ov}`, 'color: red; text-decoration: underline'],
          [`New Value: %c${nv}`, 'color: green; text-decoration: underline'],
        );
        setValue(nv);
      } catch (e) {
        logState('❌ Could not parse LS data from Event', key, newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [setValue, key]);
  return [value, setValue];
};
