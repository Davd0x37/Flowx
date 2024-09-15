// @TODO: handle nested data
export const createFormData = (data: Record<string, string | Blob>): FormData => {
  const formData = new FormData()

  for (const query of Object.entries(data)) {
    const [key, val] = query
    formData.set(key, val)
  }

  return formData
}
