<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <!-- <img style="width: 10%;margin-left: 2%;margin-top:0.4%;" src="/logo-apps-1 1.png" alt=""> -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav w-100 d-flex justify-content-end">
                <div class="d-flex" style="margin-left: 2%;">
                    <li class="nav-item" style="padding-right:0.5em;">
                    <button class="nav-link text-warning btn" @click="actLogout">Logout</button>
                    </li>
                </div>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navbar',
  setup() {
  },
  methods: {
    actLogout(){
        localStorage.setItem("token", "")
        let baseUrl =  window.location.origin
        window.location.href = baseUrl
    }
  }
})
</script>

<style scoped>

</style>