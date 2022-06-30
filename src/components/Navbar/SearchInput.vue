<template>
  <div id="SearchInput">
    <input class="search-input" v-model="searchQuery" @input="refreshRessource">
    <div v-if="enableSuggestion">
      <div v-show ="searchQuery" v-for="(game,key) in resultQuery" :key="game.name+key">
        {{game.name}}
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "SearchInput",
    props: {
      enableSuggestion: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({
      searchQuery: null,
      resources: [],
    }),
    methods: {
      refreshRessource() {
        if (this.$data.searchQuery) {
          fetch(`https://swapit-api-game.herokuapp.com/api/games.json?properties%5B%5D=name&name=${this.searchQuery}`).then(response => response.json()).then(data => {
            console.log(this.$data.searchQuery)
            console.info(data)
            this.$data.resources = data;
          }).catch(err => {
            console.error(err)
          })
        } 
      },
      ressourceFormater(resources) {
        if(resources.length >10) {
            return resources.slice(0,10)
          } else {
            return resources
          }
      },
    },
    computed: { 
      resultQuery() {
        if (this.$data.searchQuery && this.$data.resources) {
          var resources = this.ressourceFormater(this.$data.resources)
          // console.log('resultQuery')
          // console.info(resources.filter(item => {
          //   return this.searchQuery
          //     .toLowerCase()
          //     .split(" ")
          //     .every(v => item.name.toLowerCase().includes(v.toLowerCase()));
          // }))
          return resources.filter(item => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every(v => item.name.toLowerCase().includes(v));
          });
          
        } else {
          return []
        }
      }
    },   
  };
</script>

<style>
.search-input{
  background-color: rgba(41, 100, 124, 0.2);
  color: rgba(41, 100, 124);
  border-radius: 5px;
  border: none;
  width: 300px;
  height: 35px;
  padding: 5px;
  margin-bottom: 30px;
}
.search-input:focus{
  outline: rgba(41, 100, 124) 2px solid;
}
</style>