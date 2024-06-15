export const createFormData = (params: { [key: string]: any }) => {
  const formData = new FormData();
  const keys = Object.keys(params);
  keys.forEach((key) => {
    formData.append(key, params[key]);
  });
  return formData;
};
