import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../api/config';


const BASE_URL = API_URL;

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);

   
    const token = localStorage.getItem('token');

    try {
      const response = await axios({
        url: `${BASE_URL}${url}`,
        method: method.toUpperCase(),
        // data: body, 
        data: (method.toUpperCase() === 'DELETE' || method.toUpperCase() === 'GET') ? undefined : body,
        headers: {
          'Content-Type': 'application/json',
         
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      });

      setLoading(false);
      // return response.data;

      if (response.data && response.data.status === 0) {
      setError(response.data.msg);
      throw new Error(response.data.msg);
    }

    return response.data;
    }catch (err) {
      if (err.response?.status === 401) {
    // Token expire ho gaya ya invalid hai
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login'; // Force logout
        }
  const msg = err.response?.data?.msg || 'API Request Failed';
  setError(msg);
  throw err;
}
  }, []);

  return { loading, error, sendRequest };
};

export default useFetch;