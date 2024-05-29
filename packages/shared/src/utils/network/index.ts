export const resolveUrl = (path: string | URL, base?: string | URL) => new URL(path, base);

export const createDownloadURL = (data: string | ArrayBuffer): string => {
  const blob = new Blob([data], {
    type: 'application/octet-stream',
  });

  const url = URL.createObjectURL(blob);
  return url;
};
