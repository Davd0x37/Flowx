// @TODO: handle nested data
export const createFormData = (data: Record<string, string | Blob>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, val]) => {
    formData.set(key, val);
  });

  return formData;
};
