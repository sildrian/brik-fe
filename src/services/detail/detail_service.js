import {apiClient} from '../client';


export const GetDetailProducts_ = async (payload,headers) => {
  let config = {
    method: 'get',
    url: "/products/"+payload,
    headers: headers
  };

  return apiClient(config)
  .then(response => response)
  .catch(error => error);
};