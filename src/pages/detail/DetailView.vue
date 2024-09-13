<template>
    <div>
      <Navbar />
      <div class="container">
        <div class="row w-100 py-4">
          <div class="col-md-12">
            <div class="d-flex justify-content-center flex-column">
              <div class="d-flex justify-content-center mb-4 w-100">
                <!-- <img src="https://img.freepik.com/premium-photo/medium-shot-woman-living-farmhouse_23-2150621719.jpg"
                  alt=""> -->
                  <img style="max-width: 626px;height: 377px;" :src="data_.image" />
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: -1%;" class="d-flex justify-content-center mb-5">
          <div style="margin-left: 4.3%;" class="d-flex">
            <button id="iMakna" :class="['btn', 'cInfo', 'btn-outline-primary', 'me-2', 'active']"><i class="bi bi-layers"></i> Price {{data_.price}}</button>
            <button id="iLetak" :class="['btn', 'cInfo', 'btn-outline-primary', 'me-2', 'active']"><i class="bi bi-layers"></i> Weight {{data_.weight}}</button>
            <button id="iArti" :class="['btn', 'cInfo', 'btn-outline-primary', 'me-2', 'active']"><i class="bi bi-layers"></i> height {{data_.height}}</button>
            <button id="iArti" :class="['btn', 'cInfo', 'btn-outline-primary', 'me-2', 'active']"><i class="bi bi-layers"></i> Category {{data_.categoryname}}</button>
          </div>
        </div>
        <div style="margin-top: -2%;" class="row w-100 mb-5">
            <div style="width: 100%;" class="d-flex align-items-center flex-column">
                <div style="margin-left: 4.5%;text-align: justify;" class="d-flex">
                    <p v-html="data_.description"></p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
  
<script>
import { defineComponent, ref } from "vue";
import {GetDetailProducts_} from '@/services/detail/detail_service'
import Navbar from '@/pages/navbar/NavbarView.vue'
import { useToast } from "vue-toastification";
import { useUserStore } from '@/stores/store'

export default defineComponent({
  name: 'detailview',
  props: ['id_detail'],
  components: {
    Navbar
  },
  setup(props) {
    const store = useUserStore()
    const toast = useToast()
    return{
        base_url: ref(window.location.origin),
        data_: ref({}),
        loading: false,
        id_detail: props.id_detail,
        kategori_: ref([]),
        toast_info: ref(''),
        toast_msg: ref(''),
        toast,
        store
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData () {
        let q = this.id_detail
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.store.getToken}`
        }
        GetDetailProducts_(q,headers).then(response => { 
            this.loading = true
            if(response.status == 200){
                this.data_ = response.data.data
            }else{
                localStorage.setItem("token", "")
                this.showToast("fail",`${response.message}`)
                let baseUrl =  window.location.origin
                window.location.href = baseUrl
            }
            this.loading = false
        }).catch((e) => {
            this.showToast("fail", `${e.toString()}`)
            this.loading = false
            let baseUrl =  window.location.origin
            window.location.href = baseUrl
        })
        this.loading = false
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