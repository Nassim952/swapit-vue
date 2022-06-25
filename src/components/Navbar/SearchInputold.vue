<template>
  <div id="SearchInput">
    <input class="search-input" >
    <b-container>
      <!-- <GameCard/> -->
    </b-container>
    <!-- <div v-show ="searchQuery" v-for="game in resultQuery" :key="game.id">{{game.title}}</div> -->
    <!-- <GamesResult v-if="resources" :query="searchQuery"/> -->
  </div>
  
</template>

<script>
  import Game from "../Game/GameCard.vue";

  // import GamesResult from "../Game/Games_Result.vue";
  export default {
    name: "SearchInput",
  components: {
        Game
    },
    props: {
        query: {
            type: String,
        },
        fixed: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        searchQuery: null,
        resources: [],
        filter: false,
    }),
    // computer: {
    //     searchQuery() {
    //         return this.$data.searchQuery ?? null
    //    },
    // },
    created() {
        this.resultQuery()
    },
    methods:{
         resultQuery() {
          console.info(this.$data.searchQuery)
          if (this.searchQuery) {
             fetch(`https://localhost/api/games.json?page=1&name=${this.searchQuery}`).then(response => response.json()).then(data => {
              console.info(data)
            this.$data.resources = data;
            
          }).catch(err => {
            console.error(err)
          })
          } else {
                fetch(`https://localhost/api/games.json?popular`).then(response => response.json()).then(data => {
                console.info(data)
                this.$data.resources = data;
            
          }).catch(err => {
            console.error(err)
          })          }
      },
    }
  };
</script>

<style scoped>
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