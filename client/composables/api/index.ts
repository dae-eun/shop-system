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
  }, 600);
  try {
    const response = await $fetch(url, requestOptions);
    if (![200, 201, 202, 204].includes(response.statusCode)) {
      throw response;
    }
    return response;
  } catch (error) {
    return error;
  } finally {
    clearTimeout(loadingTimeout);
    useLoading().setLoading(false);
  }
};
