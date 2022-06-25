<template>
  <div id="Filtres" class="menu-items">
    <div v-for="(filter,title) in filters" :key="title">
      <Filtre :title="title" :resource="filter"></Filtre>
    </div>
  </div>
</template>

<script>
  import Filtre from "./Filtre.vue";
  import {Igdb} from "../../lib/Services/Igdb";
  export default {
    components: {
      Filtre,
    },
    name: "Filtres",
    data: () => ({
      searchQuery: null,
      filters: {
        genres: [],
        platforms: [],
        modes: [],
      },
      mobile: false,
    }),
    async created () {
      this.generateCategories()
    },
    methods:{
      //fetch and initialise filters
      async generateCategories() {
        var provider = new Igdb();
        var properties = ['id','name']
        // provider.getGenres(null,properties).then(response => { console.info(response); this.$data.filters.genres= response }).catch(error => { console.log(error) })
        // provider.getPlatforms(null,properties).then(response => { console.info(response); this.$data.filters.platforms = response}).catch(error => { console.log(error) })
        // provider.getModes(null,properties).then(response => { this.$data.filters.modes = response}).catch(error => { console.log(error) })
        provider.getGenres(null,properties).then(response => { this.$data.filters.genres = response})
        provider.getPlatforms(null,properties).then(response => { this.$data.filters.platforms = response})
        provider.getModes(null,properties).then(response => { this.$data.filters.modes= response})

        // this.$data.filters.genres 
        // console.log(data)
        // this.$data.filters.platforms =  provider.getPlatforms(null,properties)
        // this.$data.filters.modes =  provider.getPlatforms(null,properties); 
        // console.info(provider.getGenres(null,properties))
      },
    }
  };
</script>

<style scoped>
.title {
    color: white;
    font-size: 24px;
    margin-top: 10px;
}

.filter_value {
    color: black;
    font-size: 10px;
    margin-top: 5px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-left: 6px;
}

.menu-items > * {
}

.side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: white;
    color: teal;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
}

.side-btn.active::before {
    top: -30px;
}

.side-btn.active::after {
    bottom: -30px;
}

.side-btn.active::before, .side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: white;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn.active .link-container::before, .side-btn.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: teal;
}
</style>