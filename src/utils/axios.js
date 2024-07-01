import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5001'
});


export const myAxios = axios.create({
  baseURL: 'http://localhost:5001'
});

// myAxios.interceptors.request.use(
//   (config) => {
//     console.log('Starting Request', config);
//     return config;
//   }
// );

// // when error occurs, print all info of error
// myAxios.interceptors.response.use(
//   (response) => {
//     console.log('Response:', response);
//     return response;
//   },
//   (error) => {
//     console.log('Error:', error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
