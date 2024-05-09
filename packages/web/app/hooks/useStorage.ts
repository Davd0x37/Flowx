import { useState } from 'react';
import { internalGuard } from '@flowx/shared/utils/guard';

export type IKey = string;

const CStorageType = {
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
} as const;

export type StorageType = (typeof CStorageType)[keyof typeof CStorageType];

/**
 * Returns local/session storage if is available
 * @param {StorageType} storageType Local/Session storage
 * @return {Storage} Local/Session storage if available
 */
const storageProvider = (storageType: StorageType): Storage => {
  const wnd = internalGuard(storageType);
  return wnd[storageType];
};

const getItem = (key: IKey, storageType: StorageType): string | null => {
  const storage = storageProvider(storageType);

  return storage.getItem(key);
};

const setItem = (key: IKey, val: string, storageType: StorageType) => {
  const storage = storageProvider(storageType);

  return storage.setItem(key, val);
};

// @FIXME: test this and fix types
export default <T = unknown>(key: IKey, value: T, storageType: StorageType = 'localStorage') => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getItem(key, storageType);

    return item ? (JSON.parse(item) as T) : value;
  });

  const setValue = (val: (arg: T) => T) => {
    const valueToStore = typeof val === 'function' ? val(storedValue) : val;

    setStoredValue(valueToStore);

    setItem(key, JSON.stringify(valueToStore), storageType);
  };

  return {
    storedValue,
    setValue,
  };
};
