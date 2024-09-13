<template>
    <Suspense>
      <template #default>
        <DetailViewComponent :id_detail="route.params.id_detail" />
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </template>
  
  <script setup>
  import { defineAsyncComponent } from 'vue';
  import Loading from '@/components/loading/LoadingView.vue'
  import { useRoute } from 'vue-router'
  
  const DetailViewComponent = defineAsyncComponent(() =>
    import('./DetailView.vue')
  );
  const route = useRoute()
  </script>