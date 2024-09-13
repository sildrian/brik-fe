import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/router'
// import store from './stores/store.js'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import Paginate from 'vuejs-paginate-next';

const pinia = createPinia()
const app = createApp(App)

app.component('paginate', Paginate);

app.use(router)
app.use(Toast)
app.use(pinia)
app.mount('#app')
