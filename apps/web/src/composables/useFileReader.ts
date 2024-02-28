/**
 * Represents the available read types for the file reader.
 */
const READ_TYPE = {
  TEXT: 'TEXT',
  ARRAY_BUFFER: 'ARRAYBUFFER',
  BINARY_STRING: 'BINARY_STRING',
  DATA_URL: 'DATA_URL',
} as const;

/**
 * Reads a file using the FileReader API and returns the file data, error status, progress, and loading state
 *
 * @param file - The file to be read
 * @param readType - The type of data to read from the file. Defaults to 'TEXT'
 * @returns An object containing the file data, error status, progress, loading state, and error state
 */
export default (file: File, readType: keyof typeof READ_TYPE = 'TEXT') => {
  const reader = new FileReader();

  const data = ref<string | ArrayBuffer | null>(null);
  const error = ref<string | null>(null);
  const progress = ref(0);
  const isLoading = ref(true);
  const isError = ref(false);

  reader.onload = function onload() {
    data.value = reader.result;
  };

  reader.onerror = (_ev: ProgressEvent<FileReader>) => {
    isError.value = true;
  };

  reader.onloadend = (_ev: ProgressEvent<FileReader>) => {
    isLoading.value = false;
  };

  reader.onprogress = (ev: ProgressEvent<FileReader>) => {
    if (ev.lengthComputable) {
      progress.value = (ev.loaded / ev.total) * 100;
    }
  };

  reader.onabort = (_ev: ProgressEvent<FileReader>) => {
    isLoading.value = false;
  };

  switch (readType) {
    case 'ARRAY_BUFFER': {
      reader.readAsArrayBuffer(file);
      break;
    }

    case 'BINARY_STRING': {
      reader.readAsBinaryString(file);
      break;
    }

    case 'DATA_URL': {
      reader.readAsDataURL(file);
      break;
    }

    default:
    case 'TEXT': {
      reader.readAsText(file);
      break;
    }
  }

  return {
    data,
    error,
    progress,
    isLoading,
    isError,
  };
};
