<template>
  <div >
  <div class="ownlist-list" v-if="myList">
    <div v-for="(game,key) in myList" id="OwnList" class="own-element" :key="key">
      <a @click="supp(game)" title="arrow icons" class="my-icon dlt-game">
        <img class="icon" src="../../assets/images/bin.png" height="10" width="10" alt="supprimer ce jeu">
      </a>
      <GameCard :game="game" />
    </div>
  </div>
  <div v-else>
    <p> Votre liste de Jeux est vide</p>
  </div>
  </div>
</template>

<script>
import GameCard from './Game_Card.vue';
export default {
  name: "Game_Card_List_Own",
  components: {
    GameCard,
  },
  props: {
    games: {
      type: Array,
      required: true,
    },
  },
  inject: ['supp','added'],
  data() {
    return {
      sortBy: 'title',
      sortDirection: 'asc',
    }
  },
  methods: {
    
  },
  computed: {
    myList() {
      return this.$props.games ?? []
    },

    
    // sortMode: function(s) {
    //     if(s === this.sortBy) {
    //         this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    //     }
    //   this.sortBy = s;
    // }
  },
  // watch: {
  //   sortedGames() {
  //     console.info(this.$data.games)
  //       if (this.$data.games?.length > 0) {
  //         console.info('there')
  //         this.$data.games.slice().sort(function(a, b){
  //           return (a[this.$data.sortBy] > b[this.$data.sortBy]) ? 1 : -1;
  //         });
  //         console.info("DATA"+this.$data.games)
  //         return this.$data.games;
  //       } else {
  //        console.info('there')
  //        return []
  //       }
  //   }
  // },
};
</script>

<style scoped>
.game_card_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  margin: 1rem;
}
.icon-wrapper {
  margin: auto;
  width: 100px; 
}
.icon {
    width: 1rem;
    height: 1rem;
}

.my-icon {
  position: absolute;
}
.ownlist-list{
  display: flex;
  flex-wrap: wrap;
}
.own-element{
  margin: 30px 15px;
}
.dlt-game{
  background-color: rgb(252, 87, 87);
  border: none;
  border-radius: 10px 10px 10px 10px;
  color: white;
  transition: all 0.3s ease;
  padding: 3px 10px;
  position: absolute;
  margin-top: 5px;
  margin-right: 5px;
  margin-left: 85px;
  cursor: pointer;
}
.dlt-game:hover{
  background-color: rgb(185, 54, 54);
  color: white;
}
</style>