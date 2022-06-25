<template>
  <div class="gameSearch-container">
    <div id="Game_Search" class="gameSearch">
      <input class="search-input" v-model="searchQuery" @input="resultQuery">
      <GameCardListAdd v-show="searchQuery" :games="resources"/>
    </div>
    <div class="game-list-added">
      <GameCardListOwn v-show="my_games" :games="my_games"/>
      <div class="button-container">
        <!-- <Button class="valider" title="Valider" :onClick="HandleSubmit" /> -->
        <Button class="valider" title="Valider" :onClick="HandleSubmit" />
        <Button class="vider" title="Vider" :onClick="clearList" />
      </div>
    </div>
  </div>
</template>

<script>
  import GameCardListAdd from './Game_Card_List_Add.vue';
  import GameCardListOwn from './Game_Card_List.vue';
  import Button from '../Buttons/Button.vue';
  import {User} from "../../lib/Services/User";
  import {Igdb} from "../../lib/Services/Igdb";

  // const instance = axios.create({
  //   baseURL: 'http://localhost:81/',
  //   timeout: 1000,
  //   headers: {
  //     'accept': 'application/ld+json',
  //     'Content-Type' : 'application/merge-patch+json'
  //   }
  // })

  export default {
      name: "Game_Search_Input",
      components: {
      GameCardListAdd,
      GameCardListOwn,
      Button,
      },
      props: {
        onSubmit: {
          type: Function,
          require: true,
        },
        route: {
          type: String,
          require: true,
          validator: (val) => ["own", "wish",].includes(val),
        }


      },
      data: () => ({
        searchQuery: null,
        resources: [],
        my_games: [],
        filter: false,
      }),
       created() {
              this.refreshRessource()
      },
      computed: { 
      
      },
      methods:{
        async refreshRessource() {
          const provider = new User()
          provider.getUser(1).then(response => { console.log(response); this.$data.my_games = response.ownGames ?? []})
        },
        add: function(game) {
          if (!this.added(game)) {
            // console.log( this.$data.my_games);
            this.$data.my_games.push(game.id)
            console.log( this.$data.my_games);
            this.HandleSubmit()
          }
        },
        supp: function(game) {
          if (this.added(game.id)) {
            this.$data.my_games = this.$data.my_games.filter(e => e.id !== game.id)
          }
        },
        added: function(game_id) {
          return (this.$data.my_games.map(game => {
            return game.id
          })).includes(game_id)
        },
        clearList: function() {
          this.$data.my_games = []
          console.info(this.$data.my_games)
      },
        HandleSubmit: function() {
            console.log( 'HandleSubmit');
          if (this.$props.route == "own") {
            console.log( 'ownGames');
            this.updateOwnGames()
          } else {
                      console.log('wishGames');

            this.updateWishGames()
          }
        },
        async updateOwnGames() {
          console.log( 'ownGames');
          var provider = new User()
          provider.patchUser(1,  {'ownGames': this.$data.gamesOwn}).then(response => { this.$data.gamesOwn = response?.ownGames ?? []})
        },
        async updateWishGames() {
          console.log('wishGames');
          var provider = new User()
          provider.patchUser(1, {'wishGames': this.$data.my_games}).then(response => { this.$data.my_games = response?.wishGames ?? [] })
        },
        resultQuery() {
          var provider = new Igdb()
          var query = []
          query['name'] = this.$data.searchQuery ?? null
          provider.getPopulars(null, null, query).then(response => { this.$data.resources = response})
        },
      },
      provide() {
        return {
        my_games: this.$data.my_games ?? [],
        add: this.add,
        supp: this.supp,
        added: this.added,
        clearList: this.clearList,
        }
      }, 
    };
</script>

<style scoped>
.gameSearch{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  padding: 2rem;
}
.game-list-added{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.button-container{
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.valider{
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  width: 50%;
  /* border-radius: 1rem; */
}
/* .valider:hover{
  background-color: rgb(0, 119, 128);
  transition: background-color 0.25s ease;
} */
.vider{
  border: none;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  width: 30%;
  /* border-radius: 1rem; */
}
/* .vider:hover{
  background-color: rgb(252, 101, 0);
  transition: background-color 0.25s ease;
} */
</style>