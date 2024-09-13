import axios from 'axios';

let baseUrlApiApp = import.meta.env.VITE_BASE_API_URL
const API_URL = baseUrlApiApp;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: '*/*',
      "Access-Control-Allow-Origin": "*"
    //   'Content-Type': 'application/json',
    },
    responseType: 'json',
    transformRequest: [
      function (data, _headers) {
        return data;
      },
    ],
});

export {
    apiClient,
};