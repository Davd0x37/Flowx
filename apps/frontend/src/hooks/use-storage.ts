import { useState } from 'react'

export type IKey = string

export const CStorageType = {
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
} as const

export type StorageType = (typeof CStorageType)[keyof typeof CStorageType]

function getItem(key: IKey, storageType: StorageType): null | string {
  const storage = storageProvider(storageType)

  return storage.getItem(key)
}

function setItem(key: IKey, val: string, storageType: StorageType) {
  const storage = storageProvider(storageType)

  return storage.setItem(key, val)
}

/**
 * Returns local/session storage if is available
 * @param {StorageType} storageType Local/Session storage
 * @return {Storage} Local/Session storage if available
 */
function storageProvider(storageType: StorageType): Storage {
  return window[storageType]
}

const useStorage = <T>(
  key: IKey,
  defaultValue: T,
  storageType: StorageType = 'localStorage',
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getItem(key, storageType)

    if (!item) {
      setItem(key, JSON.stringify(defaultValue), storageType)
      return defaultValue
    }

    return JSON.parse(item) as T
  })

  const setValue = (val: ((arg: T) => T) | T) => {
    const valueToStore =
      typeof val === 'function' ? (val as (arg: T) => T)(storedValue) : val

    setStoredValue(valueToStore)

    setItem(key, JSON.stringify(valueToStore), storageType)
  }

  return {
    setValue,
    storedValue,
  }
}

export default useStorage
