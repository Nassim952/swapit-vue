<template>
  <div class="gameSearch-container">
    <div id="Game_Search" class="gameSearch">
      <input class="search-input" v-model="searchQuery" @input="resultQuery">
      <GameCardListAdd v-show="searchQuery" :games="resources" />
    </div>
    <div class="game-list-added">
      <GameCardList v-show="aGames" :games="aGames" />
      <div class="button-container">
        <!-- <Button class="valider" title="Valider" :onClick="HandleSubmit" /> -->
        <!-- <Button class="valider" title="Valider" :onClick="HandleSubmit" /> -->
        <Button class="vider" title="Vider" :onClick="clearList" />
      </div>
    </div>
  </div>
</template>

<script>
import GameCardListAdd from './Game_Card_List_Add.vue';
import GameCardList from './Game_Card_List.vue';
import Button from '../Buttons/Button.vue';
import { User } from "../../lib/Services/User";
import { Igdb } from "../../lib/Services/Igdb";


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
  methods: {
    async refreshRessource() {
      const provider = new User()


      provider.auth.me().then(response => {
        if (this.$props.route == "own") {
          provider.getUser(response.id).then(response => { this.$data.aGamesTmp = response?.ownGames ?? [] })
          this.updateCurrentOwnGames(response.id)
        } else {
          provider.getUser().then(response => { this.$data.aGamesTmp = response?.wishGames ?? [] })
          this.updateCurrentWishGames(response.id)
        }
      })
    },
    updateCurrentOwnGames(idUser) {
      var provider = new User()
      var providerGame = new Igdb()
      provider.getUser(idUser).then(response => {
        if (response) {
          response.ownGames.forEach(element => {
            providerGame.getGames(null, null, { "id": element }).then(response => {
              this.$data.aGames.push(response.shift())
            })
          });
        }
      })
    },
    updateCurrentWishGames(idUser) {
      var provider = new User()
      var providerGame = new Igdb()
      provider.getUser(idUser).then(response => {
        if (response) {
          response.wishGames.forEach(element => {
            providerGame.getGames(null, null, { "id": element }).then(response => {
              this.$data.aGames.push(response.shift())
            })
          });
        }
      })
    },
    add: function (game) {
      if (!this.added(game)) {
        this.$data.aGamesTmp.push(game.id)
        this.HandleSubmit()
      }
    },
    supp: function (game) {
      if (this.added(game.id)) {
        this.$data.aGamesTmp = this.$data.aGamesTmp.filter(e => e.id !== game.id)
        this.HandleSubmit()
      }
    },
    added: function (game_id) {
      return (this.$data.aGamesTmp.map(game => {
        return game.id
      })).includes(game_id)
    },
    clearList: function () {
      this.$data.aGamesTmp = []
      const provider = new User()
    
     provider.auth.me().then(response => {
        if(this.$props.route == "own"){
          provider.patchUser(response.id, { 'ownGames': [] }).then(response => {
            console.log(response);
          })
        }else{
          provider.patchUser(response.id, { 'wishGames': [] }).then(response => {
            console.log(response);
          })
        }
      })

    },
    HandleSubmit: function () {
      if (this.$props.route == "own") {
        this.updateOwnGames()
      } else {
        this.updateWishGames()
      }
    },
    async updateOwnGames() {

      const provider = new User();
      const providerIgdb = new Igdb()
    
      provider.auth.me().then(response => {
        if (response) {
          provider.patchUser(response.id, { 'ownGames': this.$data.aGamesTmp })
            .then(response => {
              if (response?.ownGames !== []) {
                providerIgdb.getGames(response?.ownGames)
                  .then(response => {
                    this.$data.aGames = response ?? []
                  });
              }
            })
        }

      })
        .catch(error => { console.log(error) })
    },
    async updateWishGames() {
      const provider = new User();
      const providerIgdb = new Igdb()

      provider.auth.me().then(response => {
        if (response) {
          provider.patchUser(response.id, { 'wishGames': this.$data.aGamesTmp })
            .then(response => {
              if (response?.wishGames) {
                providerIgdb.getGames(response?.wishGames)
                  .then(response => {
                    this.$data.aGames = response ?? []
                  });
              }
            })
        }
      })
        .catch(error => { console.log(error) })

    },
    resultQuery() {
      var provider = new Igdb()
      var query = []
      query['name'] = this.$data.searchQuery ?? null
      provider.getPopulars(null, null, query).then(response => { this.$data.resources = response })
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
.gameSearch {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  padding: 2rem;
}

.game-list-added {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 300px;
}

.valider {
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
.vider {
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