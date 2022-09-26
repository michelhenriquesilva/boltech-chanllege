import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 30000,
  timeoutErrorMessage: 'Servidor indisponível. Verifique sua conexão'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@BoltechChanllege:token')
  config.headers = {
    Authorization: `Bearer ${token}` || ''
  }
  return config
})

api.interceptors.response.use((response) => {
  return response;
}, async function (error) {
  if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('@BoltechChanllege:user');
        localStorage.removeItem('@BoltechChanllege:token');
      }
  } else if (error?.response?.data?.message) {
    alert(error?.response?.data?.message);
  } else {
    alert(error?.message);
  }
  return Promise.reject(error);
});

export default api
