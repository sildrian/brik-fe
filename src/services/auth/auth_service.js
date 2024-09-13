import {apiClient} from '../client';


export const OnLogin = async (payload) => {
  let config = {
    method: 'post',
    url: "login",
    headers: payload.headers,
    data: payload.data,
  };

  return apiClient(config)
  .then(response => response)
  .catch(error => error);
};