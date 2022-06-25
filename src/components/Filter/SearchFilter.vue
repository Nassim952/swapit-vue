<template>
  <div id="SearchFilter">
    <Filtres :filtres_data = "filters"></Filtres>
  </div>
</template>

<script>
  import Filtres from "./Filtres.vue";
  export default {
    components: {
      Filtres,
    },
    name: "SearchFilter",
    data: () => ({
      filters : {}
    }),
  };
</script>

<style scoped>
  #SearchFilter{
    background: rgba(41, 100, 124, 0.37);
  }
</style>