import {apiClient} from '../client';


export const GetProducts_ = async (payload,headers) => {
  let queryParamString = Object.keys(payload).map(key => key + '=' + payload[key]).join('&');
  let config = {
    method: 'get',
    url: "/products?"+queryParamString,
    headers: headers
  };

  return apiClient(config)
  .then(response => response)
  .catch(error => error);
};