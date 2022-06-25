<template>
  <div id="SearchInput">
    <!-- <input v-model="searchQuery"> -->
    <div v-show ="searchQuery" v-for="game in resultQuery" :key="game.id">{{game.title}}</div>
  </div>
</template>

<script>

  export default {
    name: "SearchInput",
    data: () => ({
      searchQuery: null,
      filter: false,
    }),
    computed: { 
      resultQuery() {
        if (this.searchQuery) {
          return this.resources.filter(item => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every(v => item.title.toLowerCase().includes(v));
          });
        } else {
          return this.resources;
        }
      }
    },   
  };
</script>

<style scoped>
</style>