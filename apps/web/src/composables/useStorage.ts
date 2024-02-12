import { ref } from 'vue';
import { internalGuard } from '@flowx/shared';

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

export default (key: IKey, value: unknown, storageType: StorageType = 'localStorage') => {
  const storedValue = ref(() => {
    const item = getItem(key, storageType);

    return item ? JSON.parse(item) : value;
  });

  const setValue = (val: unknown) => {
    const valueToStore = typeof val === 'function' ? val(storedValue) : val;

    storedValue.value = valueToStore;

    setItem(key, JSON.stringify(valueToStore), storageType);
  };

  return {
    storedValue,
    setValue,
  };
};
