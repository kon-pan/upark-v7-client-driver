import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

const useAxios = (params: AxiosRequestConfig) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.request(params);
      setResponse(response.data);
      setError(null);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params);
  }, [params]);

  return { response, error, loading };
};

export default useAxios;
