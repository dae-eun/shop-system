import { useLoading } from '~/stores/common/isLoading';

interface RequestOptions {
  method: string
  headers?: {
    'Content-Type': string
  }
  formData?: FormData
  body?: string
}

export const useFetchBase = async (url: string, options: RequestOptions): Promise<any> => {
  const requestOptions: RequestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const loadingTimeout = setTimeout(() => {
    useLoading().setLoading(true);
  }, 300);
  return await $fetch(url, requestOptions)
    .then((response) => {
      if (![200, 201, 202, 204].includes(response.statusCode)) {
        throw response.error;
      }
      return response;
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      clearTimeout(loadingTimeout);
      useLoading().setLoading(false);
    });
};
