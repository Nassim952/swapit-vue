<template>
    <b-container>
        <div v-if="resources">
                    <Game v-for="(game,key) in resources" :key="game.id+key" :game="game"/>
        </div>
        <!-- <GameCard/> -->
    </b-container>
</template>

<script>
import Game from "./GameLayer.vue";

export default {
    name:"Game_Result",
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
        resources: [],
        filter: false,
    }),
    computer: {
        searchQuery() {
            return this.$data.searchQuery ?? null
       },
    },
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

</style>