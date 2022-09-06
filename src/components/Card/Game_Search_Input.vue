<template>
  <div class="gameSearch-container">
    <div id="Game_Search" class="gameSearch">
      <input class="search-input-list w-100" v-model="searchQuery" @input="resultQuery" placeholder="Rechercher un jeu à ajouter">
      <GameCardListAdd v-show="searchQuery" :games="resources" />
    </div>
    <div class="ownlist-container">
      <GameCardList v-show="aGames" :games="aGames" />
      <div class="button-container">
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
      this.$isLoading(true)
      const provider = new User()
      provider.auth.me().then(response => {
        if (this.$props.route == "own") {
          provider.getUser(response.id).then(response => { this.$data.aGamesTmp = response?.ownGames ?? [] })
          this.updateCurrentOwnGames()
        } else {
          provider.getUser(response.id).then(response => { this.$data.aGamesTmp = response?.wishGames ?? [] })
          this.updateCurrentWishGames()
        }
      }) 
    },
    updateCurrentOwnGames() {
      var provider = new User()
      var providerGame = new Igdb()
      provider.auth.me().then(response => {
        if (response && response.ownGames.length > 0) {
          providerGame.getGames(response.ownGames).then(response => {
            if (response) {
              this.$data.aGames = response
            }
          }).then(() => {
            this.$isLoading(false)
          })
        } else {
          this.$isLoading(false)
        }
      })
    },
    updateCurrentWishGames() {
      var provider = new User()
      var providerGame = new Igdb()
      provider.auth.me().then(response => {
        if (response && response.wishGames.length > 0) {
          providerGame.getGames(response.wishGames).then(response => {
            if (response) {
              this.$data.aGames = response
            }
          }).then(() => {
            this.$isLoading(false)
          })
        } else {
          this.$isLoading(false)
        }
      })
    },
    add: function (game) {
      console.log(game.id)
      if (!this.added(game)) {
        if (this.$data.aGamesTmp.includes(game.id)) {
          this.$fire({
            title: "Info",
            text: "Ce jeu est déjà dans votre liste",
            type: "info",
          })
        }
        else {
          this.$data.aGamesTmp.push(game.id)
          this.HandleSubmit()
          this.$fire({
            title: "Succès",
            text: "Le jeu a été ajouté à votre liste",
            type: "success",
          })
        }
      }
    },
    supp: function (game) {
      var provider = new User()
      provider.auth.me().then(response => {
        if (response) {
          if (this.$props.route == "own") {
            response.ownGames.splice(response.ownGames.indexOf(game.id), 1)
            provider.patchUser(response.id, { "ownGames": response.ownGames })
            this.$fire({
              title: "Suppression réussie",
              text: "Votre jeu a bien été supprimé de votre liste de jeux possédés",
              type: "success",
            }).then(() => {
              if (this.$props.route == "own") {
                provider.getUser(response.id).then(response => { this.$data.aGamesTmp = response?.ownGames ?? [] })
                this.updateCurrentOwnGames()
              } else {
                provider.getUser(response.id).then(response => { this.$data.aGamesTmp = response?.wishGames ?? [] })
                this.updateCurrentWishGames()
              }
            })
          } else {
            response.wishGames.splice(response.wishGames.indexOf(game.id), 1)
            provider.patchUser(response.id, { "wishGames": response.wishGames })
            this.$fire({
              title: "Suppression réussie",
              text: "Votre jeu a bien été supprimé de votre liste de jeux souhaités",
              type: "success",
            }).then(() => {
              if (this.$props.route == "own") {
                provider.getUser(response.id).then(response => { this.$data.aGamesTmp = response?.ownGames ?? [] })
                this.updateCurrentOwnGames()
              } else {
                provider.getUser(response.id).then(response => { this.$data.aGamesTmp = response?.wishGames ?? [] })
                this.updateCurrentWishGames()
              }
            })
          }
        }
        else {
          this.$fire({
            title: "Erreur",
            text: "Une erreur est survenue lors de la suppression de votre jeu",
            type: "error",
          }).then(() => {
            // window.location.reload()
          })
        }
      })
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
        if (this.$props.route == "own") {
          provider.patchUser(response.id, { 'ownGames': [] }).then(() => {
            this.$fire({
              title: "Succès",
              text: "Votre liste de jeux possédés a été vidée",
              type: "success",
            }).then(() => {
              window.location.reload()
            })
          })
        } else {
          provider.patchUser(response.id, { 'wishGames': [] }).then(() => {
            this.$fire({
              title: "Succès",
              text: "Votre liste de jeux souhaités a été vidée",
              type: "success",
            }).then(() => {
              window.location.reload()
            })
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
              if (response?.ownGames) {
                providerIgdb.getGames(response?.ownGames)
                  .then(response => {
                    this.$data.aGames = response ?? []
                  });
              }
            })
        }
      })
        .catch(() => {
          this.$fire({
            title: 'Erreur',
            text: 'Une erreur est survenue',
            type: 'error'
          })
        })
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
        .catch(() => {
          this.$fire({
            title: 'Erreur',
            text: 'Une erreur est survenue',
            type: 'error'
          })
        })

    },
    resultQuery() {
      var provider = new Igdb()
      var query = {}
      this.$data.searchQuery ? query.slug = this.$data.searchQuery : null
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
  width: 35%;
  height: 100%;
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
  justify-content: center;
  margin-top: 50px;
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

.gameSearch-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ownlist-container{
  width: 78%;
  min-height: 800px;
}
.search-input-list {
  border: none;
  border-bottom: solid 2px #FB5D19;
  outline: none;
  padding: 10px 20px;
}
.search-input-list:focus {
  border-radius: 10px;
  border: solid 2px #FB5D19;
  transition: border 0.15s ease-in;
}
@media screen and (max-width: 991px) {
  .gameSearch {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120%;
  height: 100%;
  padding: 2rem;
}
}
</style>