<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
        <h1 class="display-1 fw-bold">404</h1>
        <p class="fs-3"> <span class="text-danger">Opps!</span> Halaman tidak ditemukan.</p>
        <p class="lead">
            Halaman yang kamu cari tidak ada.
        </p>
        <router-link :to="{ name: 'dashboard' }" class="btn btn-primary">
          {{ 'kembali ke dashboard' }}
        </router-link>
    </div>
</div>
</template>

<script>
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'Notfound',
  setup () {
    return {
      page_not_found: ref('Halaman Tidak Ditemukan'),
    }
  },
})
</script>