<template>
  <div class="gameSearch-container">
    <div id="Game_Search" class="gameSearch">
      <input class="search-input" v-model="searchQuery" @input="resultQuery">
      <GameCardListAdd v-show="searchQuery" :games="resources"/>
    </div>
    <div class="game-list-added">
      <GameCardList v-show="aGames" :games="aGames"/>
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
  import GameCardList from './Game_Card_List.vue';
  import Button from '../Buttons/Button.vue';
  import {User} from "../../lib/Services/User";
  import {Igdb} from "../../lib/Services/Igdb";
  import jwt_decode from "jwt-decode";


  export default {
      name: "Game_Search_Input",
      components: {
      GameCardListAdd,
      GameCardList,
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
        aGames: [],
        aGamesTmp: [],
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
          if (this.$props.route == "own") {
            provider.getUser(1).then(response => {this.$data.aGamesTmp = response?.ownGames ?? []})
            this.updateOwnGames()
          } else {
                      console.log('wishGames');
          provider.getUser(1).then(response => {this.$data.aGamesTmp = response?.wishGames ?? []})
          this.updateWishGames()
          }
        },
        add: function(game) {
          if (!this.added(game)) {
            // console.log( this.$data.aGames);
            this.$data.aGamesTmp.push(game.id)
            this.HandleSubmit()
          }
        },
        supp: function(game) {
          if (this.added(game.id)) {
            this.$data.aGamesTmp = this.$data.aGamesTmp.filter(e => e.id !== game.id)
            this.HandleSubmit()

          }
        },
        added: function(game_id) {
          return (this.$data.aGamesTmp.map(game => {
            return game.id
          })).includes(game_id)
        },
        clearList: function() {
          this.$data.aGamesTmp = []
          console.info(this.$data.aGamesTmp)
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

          const provider = new User();
          const providerIgdb = new Igdb()
          var token = localStorage.getItem('token');
          var decoded = jwt_decode(token);

          provider.getUsers(null, null, { "email": decoded.email }).then(response => {
            if(response.length > 0) {
              provider.patchUser(response.id,  {'ownGames': this.$data.aGamesTmp})
              .then(response => { 
                if (response?.ownGames) {
                  providerIgdb.getGames(response?.ownGames)
                  .then(response => {
                  this.$data.aGames = response ?? []
                });
                } else this.clearList()
              })
            }

          })
          .catch(error => {console.log(error)})
        },
        async updateWishGames() {
          const provider = new User();
          const providerIgdb = new Igdb()
          var token = localStorage.getItem('wishGames');
          var decoded = jwt_decode(token);

          provider.getUsers(null, null, { "email": decoded.email }).then(response => {
            if(response.length > 0) {
              provider.patchUser(response.id,  {'wishGames': this.$data.aGamesTmp})
              .then(response => { 
                if (response?.wishGames) {
                  providerIgdb.getGames(response?.wishGames)
                  .then(response => {
                  this.$data.aGames = response ?? []
                });
                } else this.clearList()
              })
            }

          })
          .catch(error => {console.log(error)})

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
        aGames: this.$data.aGames ?? [],
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