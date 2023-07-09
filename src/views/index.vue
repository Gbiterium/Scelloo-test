<template>
    <div class="home">
      <TableComponent />
    </div>
  </template>
  
  <script>
  import TableComponent from '@/components/TableComponent.vue'
  
  export default {
    name: 'index',
    components: {
      TableComponent
    }
  }
  </script>