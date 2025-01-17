import { useState } from 'react'

/**
 * Represents the available read types for the file reader.
 */
const READ_TYPE = {
  ARRAY_BUFFER: 'ARRAYBUFFER',
  BINARY_STRING: 'BINARY_STRING',
  DATA_URL: 'DATA_URL',
  TEXT: 'TEXT',
} as const

/**
 * Reads a file using the FileReader API and returns the file data, error status, progress, and loading state
 *
 * @param file - The file to be read
 * @param readType - The type of data to read from the file. Defaults to 'TEXT'
 * @returns An object containing the file data, error status, progress, loading state, and error state
 */
const useFileReader = (
  file: File,
  readType: keyof typeof READ_TYPE = 'TEXT',
) => {
  const reader = new FileReader()

  const [data, setData] = useState<ArrayBuffer | null | string>(null)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  reader.onload = function onload() {
    setData(reader.result)
  }

  reader.onerror = (_ev: ProgressEvent<FileReader>) => {
    setIsError(true)
  }

  reader.onloadend = (_ev: ProgressEvent<FileReader>) => {
    setIsLoading(false)
  }

  reader.onprogress = (ev: ProgressEvent<FileReader>) => {
    if (ev.lengthComputable) {
      setProgress((ev.loaded / ev.total) * 100)
    }
  }

  reader.onabort = (_ev: ProgressEvent<FileReader>) => {
    setIsLoading(false)
  }

  switch (readType) {
    case 'ARRAY_BUFFER': {
      reader.readAsArrayBuffer(file)
      break
    }

    case 'BINARY_STRING': {
      reader.readAsBinaryString(file)
      break
    }

    case 'DATA_URL': {
      reader.readAsDataURL(file)
      break
    }
    default: {
      reader.readAsText(file)
      break
    }
  }

  return {
    data,
    isError,
    isLoading,
    progress,
  }
}

export { READ_TYPE, useFileReader }
