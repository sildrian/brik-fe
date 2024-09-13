<template>
    <Suspense>
      <template #default>
        <ListViewComponent />
      </template>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </template>
  
  <script setup>
  import { defineAsyncComponent } from 'vue';
  import Loading from '@/components/loading/LoadingView.vue'
  
  const ListViewComponent = defineAsyncComponent(() =>
    import('./ListView.vue')
  );
  </script>