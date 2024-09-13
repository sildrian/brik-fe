<template>
    <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        
        <div class="container">
            <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div class="d-flex justify-content-center py-4">
                        <!-- <img style="width: 35%;" src="vite.svg" alt=""> -->
                </div> <!-- End Logo -->

                <div class="card mb-3">

                <div class="card-body">

                    <form class="row g-3 needs-validation" @submit.prevent="submitLogin" novalidate>

                    <div class="col-12 pt-3">
                        <label for="yourUsername" class="form-label">Username</label>
                        <div class="input-group has-validation">
                        <input id="username" type="text" v-model="username" class="form-control" required autofocus autocomplete="no hp">
                        <div class="invalid-feedback">Please enter your no hp.</div>
                        </div>
                    </div>

                    <div class="col-12">
                        <label for="yourPassword" class="form-label">Password</label>
                        <input id="password" type="password" v-model="password" class="form-control" required autocomplete="current-password">
                        <div class="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">
                            Login
                            <span v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span class="visually-hidden">Loading...</span>
                            </span>
                        </button>
                    </div>
                    </form>

                </div>
                </div>


            </div>
            </div>
        </div>

        </section>
        </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {OnLogin} from '@/services/auth/auth_service'
import { useToast } from "vue-toastification";
import { useUserStore } from '@/stores/store'

  export default defineComponent({
    name: 'Login',
    setup () {
        const store = useUserStore()
        const toast = useToast();
        return {
            base_url: ref(window.location.origin),
            username: ref(''),
            password: ref(''),
            loading: ref(false),
            isToastActive: ref(false),
            toast_info: ref(''),
            toast_msg: ref(''),
            toast,
            store
        }
    },
    methods:{
        refreshPage(){
            window.location.href = this.base_url
        },
        submitLogin(){
            this.loading = true
            try{
                let payload = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        "username": this.username,
                        "password": this.password
                    })
                }

                OnLogin(payload).then( (res) => {
                    if(res.status == 200){
                        this.store.successLogin(res.data.token)
                        this.showToast("success","berhasil login")
                        let baseUrl =  window.location.origin
                        window.location.href = baseUrl
                    }else{
                        this.showToast("fail",`${res.response.data.message}`)
                    }
                    this.loading = false
                })
                .catch((error) => {
                    // alert(error)
                    this.showToast("fail",`${error.toString()}`)
                    this.loading = false
                })
            }catch(e){
                // alert(e.toString())   
                this.showToast("fail",`${e.toString()}`) 
                this.loading = false
            }
        },
        showToast(info,msg) {
            if(info == "fail"){
            this.toast.error(`${msg}`, {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: "fas fa-rocket",
            rtl: false
            });
            }else{
            this.toast.success(`${msg}`, {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
            });
            }
        }
    }
  })
</script>