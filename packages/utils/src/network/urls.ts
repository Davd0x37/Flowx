const resolveUrl = (path: string | URL, base?: string | URL) => {
  return new URL(path, base)
}

function createDownloadURL(data: ArrayBuffer | string): string {
  const blob = new Blob([data], {
    type: 'application/octet-stream',
  })

  const url = URL.createObjectURL(blob)
  return url
}

/**
 * Encode request body data into URLSearchParams.
 *
 * @param data - Request data to be encoded.
 * @returns Encoded request body.
 */
function encodeRequestBody(
  data: Record<string, null | string>,
): URLSearchParams {
  const encodedData = new URLSearchParams()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) {
      encodedData.append(key, value)
    }
  })
  return encodedData
}

export { createDownloadURL, encodeRequestBody, resolveUrl }
