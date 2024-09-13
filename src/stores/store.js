import {defineStore} from 'pinia'

export const useUserStore = defineStore('counter', {
    state: () => ({ token: "", name: '' }),
    getters: {
      getToken: (state) => localStorage.getItem('token') || state.token,
      getName: (state) => state.name,
    },
    actions: {
      successLogin(token){
        localStorage.setItem("token", token)
        this.token = token
      }
    },
  })