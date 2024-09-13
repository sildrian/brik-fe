<template>
    <div>
        <Navbar />
        <div class="hero-section">
            <div class="container pt-4">
                <div class="input-group mb-3 search-bar">
                <input v-model="search_" type="text" class="form-control" placeholder="Cari produk" aria-label="Search all assets"
                    aria-describedby="button-addon2">
                <button @click="getData" class="btn btn-primary" type="button">Cari</button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12" style=" border: 0 solid #ddd; border-width: 0 1px 0 1px;">
                    <div v-if="typeof(data_) != 'undefined' && data_.length > 0" class="row">
                        <div style="" class="container-costum">
                            <!-- original code -->
                            <div class="filter-result mt-4" v-for="(itm,index) in data_" :key="index">
                                <div class="job-box d-md-flex align-items-center justify-content-between mb-30">
                                    <div class="job-left my-4 d-md-flex align-items-center flex-wrap">
                                            <div style="cursor: pointer;" @click="detailProduct(itm?.id)" class="card-img-container">
                                                <img class="img-holder d-lg-flex" :src="itm.image != '' ? itm.image : base_url+'/no-image.png'" />
                                            </div>
                                        <div class="job-content">
                                            <h5 style="margin-left: -6.5em;" class="text-md-left">{{ itm?.name}}</h5>
                                            <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                                <li class="mr-md-4">
                                                    <i class="zmdi zmdi-pin mr-2" v-if="itm?.description.length > 16" v-html="itm?.description.substring(0,25)+' ...' "></i>
                                                    <i class="zmdi zmdi-pin mr-2" v-else v-html="itm?.description"></i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="job-right my-4 flex-shrink-0">
                                        <a @click="detailProduct(itm?.id)"  class="btn d-block w-100 d-sm-inline-block btn-primary">Detail</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="row justify-content-center align-items-center" style="height: 100vh;">
                        <h5 style="text-align: center;">No Data</h5>
                    </div>
                    <div class="container">
                        <div class="row">
                            <!-- pagination -->
                            <div class="col-md-12 d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <paginate
                                        style="cursor: pointer;"
                                        v-model="page_number"
                                        :page-count="page_count"
                                        :page-range="3"
                                        :margin-pages="2"
                                        :click-handler="getData"
                                        :prev-text="'Prev'"
                                        :next-text="'Next'"
                                        :container-class="'pagination'"
                                        :page-class="'page-item'"
                                    >
                                    </paginate>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref } from "vue";
import {GetProducts_} from '@/services/dashboard/dashboard_service'
import Navbar from '@/pages/navbar/NavbarView.vue'
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/store'

export default defineComponent({
  name: 'listview',
  components: {
    Navbar
  },
  setup() {
    const store = useUserStore()
    const route = useRoute()
    const toast = useToast()
    return{
        base_url: ref(window.location.origin),
        data_: ref({}),
        loading: false,
        page_count: ref(1),
        page_number: ref(1),
        limit_: ref(10),
        offset: ref(0),
        search_: ref(route.query.search),
        tmp_filter_categori: ref([]),
        filter_kategori_: ref(route.query.kategori != '' && typeof(route.query.kategori) != 'undefined' ? route.query.kategori : 0),
        
        kategori_: ref([]),
        toast_info: ref(''),
        toast_msg: ref(''),
        toast,
        store
    }
  },
  mounted() {
    this.getData();
    this.getKategori();
  },
  methods: {
    getData (page = 1) {
        let q = {
            'search': typeof(this.search_) != 'undefined' && this.search_ != '' ? this.search_ : '',
            'page': typeof(page) != 'number' ? 1 : page,
            'sortby': typeof(this.search_) != 'undefined' && this.search_ != '' ? this.sortby_ : '',
            'kategori': this.filter_kategori_ != 0 && this.filter_kategori_ != '' ? this.filter_kategori_ : '',
            'label': this.filter_label_str != '' ? this.filter_label_str : '',
            'limit': this.limit_
        }
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.store.getToken}`
        }
        GetProducts_(q,headers).then(response => { 
            this.loading = true
            if(response.status == 200){
                this.data_ = response.data.data
                this.page_count = Math.ceil(response.data.meta.total/this.limit_)
                if(typeof(page) != 'number'){
                    this.page_number = 1
                }else{
                    this.page_number = Math.ceil(response.data.meta.total/this.limit_) > 0 ? page : 0
                }
                // this.offset = (response.data.data?.current_page - 1) * this.limit
            }else{
                localStorage.setItem("token", "")
                this.showToast("fail",`${response.response.data.message}`)
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
    detailProduct(id){
        this.$router.push({ path: `/detail/${id}`});
    },
    getKategori(){
        // GetKategori_().then(response => { 
        //     if(response.status == 200){
        //         this.kategori_ = response.data.data
        //     }else{
        //         this.showToast("fail",`${response.response.data.message}`)
        //     }
        // }).catch((e) => {
        //     this.showToast("fail", `${e.toString()}`)
        // })
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

<style scoped>
.hero-section {
    /*background-image: url('https://fps.cdnpk.net/home/cover/image-12.webp?w=1400&h=438');*/
    background-image: url('/web-bg.jpg');
    background-size: cover;
    background-position: center;
    /*padding: 100px 0;*/
    color: white;
    text-align: center;
    position: relative;
    height: 93px;
  }

  .hero-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .hero-section>* {
    position: relative;
    z-index: 2;
  }

.filter-result{
    margin-left: 6em;
    margin-right: 6em;
}
.filter-result .job-box {
    background:#fff;
      -webkit-box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
              box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
      border-radius: 10px;
      padding: 10px 35px;
    }
    
    ul {
      list-style: none; 
    }
    
    .list-disk li {
      list-style: none;
      margin-bottom: 12px;
    }
    
    .list-disk li:last-child {
      margin-bottom: 0;
    }
    
    .job-box .img-holder {
      height: 130px;
      width: 130px;
      background-color: #4e63d7;
      background-image: -webkit-gradient(linear, left top, right top, from(rgba(78, 99, 215, 0.9)), to(#5a85dd));
      background-image: linear-gradient(to right, rgba(78, 99, 215, 0.9) 0%, #5a85dd 100%);
      font-family: "Open Sans", sans-serif;
      color: #fff;
      font-size: 22px;
      font-weight: 700;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      border-radius: 65px;
    }
    
    .career-title {
      background-color: #4e63d7;
      color: #fff;
      padding: 15px;
      text-align: center;
      border-radius: 10px 10px 0 0;
      background-image: -webkit-gradient(linear, left top, right top, from(rgba(78, 99, 215, 0.9)), to(#5a85dd));
      background-image: linear-gradient(to right, rgba(78, 99, 215, 0.9) 0%, #5a85dd 100%);
    }
    
    .job-overview {
      -webkit-box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
              box-shadow: 0 0 35px 0 rgba(130, 130, 130, 0.2);
      border-radius: 10px;
    }
    
    @media (min-width: 992px) {
      .job-overview {
        position: -webkit-sticky;
        position: sticky;
        top: 70px;
      }
    }
    
    .job-overview .job-detail ul {
      margin-bottom: 28px;
    }
    
    .job-overview .job-detail ul li {
      opacity: 0.75;
      font-weight: 600;
      margin-bottom: 15px;
    }
    
    .job-overview .job-detail ul li i {
      font-size: 20px;
      position: relative;
      top: 1px;
    }
    
    .job-overview .overview-bottom,
    .job-overview .overview-top {
      padding: 35px;
    }
    
    .job-content ul li {
      font-weight: 600;
      opacity: 0.75;
      border-bottom: 1px solid #ccc;
      padding: 10px 5px;
    }
    
    @media (min-width: 768px) {
      .job-content ul li {
        border-bottom: 0;
        padding: 0;
      }
    }
    
    .job-content ul li i {
      font-size: 20px;
      position: relative;
      top: 1px;
    }
    
    .mb-30 {
        margin-bottom: 30px;
    }
    /* card images */
    /*
    .card-img-container {
        position: relative;
        overflow: hidden;
    }
    */
    .card-img-container img {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, opacity 0.3s ease;
    }
    

    .card-img-container:hover img {
    transform: scale(1.1);
    opacity: 0.7;
    }

    .search-bar {
        max-width: 800px;
        margin: 0 auto;
    }

    @media (min-width: 768px) {
        .col-md-3 {
            flex: 0 0 auto;
            width: 22%;
        }
    }
    @media (min-width: 1200px) {
        .container, .container-lg, .container-md, .container-sm, .container-xl {
            max-width: 1270px;
        }
    }
</style>