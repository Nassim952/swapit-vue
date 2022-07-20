<template>
  <div id="Game_Exchange" class="exchange_container">
    <div class="gameExchange">
      <div class="to_exchange user_game_container">
        <div style="margin-bottom: 20px;">
          <h5>Jeux Possedés de {{ capitalizeFirstLetter(user.username) }}</h5>
        </div>
        <GamesToExchange :games="gamesToExchange" />
      </div>
      <div class="wish_exchange user_game_container">
        <div style="margin-bottom: 20px;">
          <h5>Jeux Souhaitées de {{ capitalizeFirstLetter(user.username) }}</h5>
        </div>
        <GamesWishExchange :matchingGames="matchingGames" :unMatchingGames="unMatchingGames" />
      </div>
    </div>
    <div class="recap_exchange">
      <div>Récap de l'échange</div>
      <GameCardExchange v-if="gameWishSelected || gameToExchangeSelected" :gameToExchange="gameToExchangeSelected"
        :gameWish="gameWishSelected" />
    </div>
    <Button title="Envoyer la demande de Swap" :onClick="HandleSubmit" />
    <div>
      <!-- <p>{{ tweened.number.toFixed(0) }}</p> -->
    </div>
  </div>

</template>

<script>
import GamesWishExchange from './Game_Wish_Exchange.vue';
import GamesToExchange from './Game_To_Exchange.vue';
import GameCardExchange from './Game_Card_Exchange.vue';
import Button from '../Buttons/Button.vue';
import { User } from '../../lib/Services/User';
import {UserAdmin} from "../../lib/Services/UserAdmin";
import { Igdb } from '../../lib/Services/Igdb';
import { Exchange } from '../../lib/Services/Exchange';

export default {
  name: "Game_Exchange",
  components: {
    GamesToExchange,
    GamesWishExchange,
    GameCardExchange,
    Button,
  },
  data: () => ({
    searchQuery: null,
    gameToExchangeSelected: null,
    gameWishSelected: null,
    gamesToExchange: [],
    gamesWish: [],
    user: {},
    matchingGames: [],
    unMatchingGames: [],
  }),
  computed: {

  },
  created() {
    this.getGamesToExchange();
    this.getGamesWish();
    this.getMatchingGames();
    // this.getGameWishSelected();
    this.getUser();
  },
  methods: {
    getUser: async function () {
      var provider = new UserAdmin()
      provider.getUser(this.$route.params.userid).then(response => {
        this.$data.user = response
      })
    },
    setToExchangeSelected: function (game) {
      this.$data.gameToExchangeSelected = game ?? null;
    },
    setWishSelected: function (game) {
      this.$data.gameWishSelected = game ?? null;
    },
    resetToExchangeSelected: function () {
      this.$data.gameToExchangeSelected = null
    },
    resetWishSelected: function () {
      this.$data.gameWishSelected = null
    },
    getGamesToExchange: async function () {
      var provider = new UserAdmin();
      var providerGame = new Igdb();
      provider.getUser(this.$route.params.userid).then((response) => {
        if (response?.ownGames !== []) {
          providerGame.getGames(response?.ownGames)
            .then(response => {
              this.$data.gamesToExchange = response ?? []
              console.log(this.$data.gamesToExchange)
            });
        }
      });
    },
    getGamesWish: async function () {
      var provider = new UserAdmin();
      var providerGame = new Igdb();
      provider.getUser(this.$route.params.userid).then((response) => {
        if (response?.wishGames !== []) {
          providerGame.getGames(response?.wishGames)
            .then(response => {
              this.$data.gamesWish = response ?? []
              console.log(this.$data.gamesWish)
            });
        }
      });
    },
    getGameWishSelected: async function () {
      var provider = new Igdb();
      provider.getGame(this.$route.params.gameid).then(response => {
        this.$data.gameWishSelected = response;
      });
    },
    addOwn: function (game) {
      this.$data.gameWishSelected = game
    },
    gameOwn: function (game_id) {
      return (this.gamesOwn.map(game => {
        return game.id
      })).includes(game_id)
    },
    addGameOwnList(idGame) {
      var provider = new User();
      provider.auth.me().then(response => {
        response.ownGames.push(idGame);
        provider.patchUser(response.id, { 'ownGames': response.ownGames }).then(() => {
          this.$fire({
            title: "Succès",
            text: "Le jeu a été ajouté à vos jeux possédés !",
            type: "success"
          }).then(() => {
            window.location.reload();
          })
        }).catch(() => {
          this.$fire({
            title: "Erreur",
            text: "Une erreur est survenue lors de l'ajout du jeu à vos jeux possédés !",
            type: "error"
          })
        })
      })
    },
    gameIsSelected: function (game) {
      return (this.gameToExchangeSelected && this.gameToExchangeSelected.id == game.id) || (this.gameWishSelected && this.gameWishSelected.id == game.id)
    },
    getMatchingGames() {
      var provider = new User();
      var providerAdmin = new UserAdmin()
      var providerGame = new Igdb()

      provider.auth.me().then(response => {
        var currentUserOwnGames = response.ownGames
        providerAdmin.getUser(this.$route.params.userid).then(response => {
          var otherUserWishGames = response.wishGames
          var matchingGames = []
          var unMatchingGames = []

          otherUserWishGames.forEach(game => {
            if (currentUserOwnGames.includes(game)) {
              matchingGames.push(game)
            } else {
              unMatchingGames.push(game)
            }
          })

          if(matchingGames.length > 0) {
            providerGame.getGames(matchingGames).then(response => {
              this.$data.matchingGames = response
            })
          }

          if(unMatchingGames.length > 0) {
            providerGame.getGames(unMatchingGames).then(response => {
              this.$data.unMatchingGames = response
            })
          }

          this.$data.matchingGames = matchingGames
          this.$data.unMatchingGames = unMatchingGames
        })
      })
    },
    capitalizeFirstLetter(string) {
      if(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },
    HandleSubmit: async function () {
      var provider = new Exchange();
      var providerUser = new User();

      providerUser.auth.me().then(response => {
        if (response) {
          provider.postExchange({
            owner: "users/" + this.$data.user.id,
            proposer: "users/" + response.id,
            proposerGame: this.$data.gameToExchangeSelected.id,
            senderGame: this.$data.gameWishSelected.id
          }).then(() => {
            this.$fire({
              title: "Swap envoyé !",
              text: "Votre demande de swap a bien été envoyé à " + this.$data.user.username + " !",
              type: "success"
            }).then(() => {
              this.$router.push("/profile");
            });
          })
        }
      }).catch(() => {
        this.$fire({
          title: "Erreur",
          text: "Une erreur est survenue lors de l'envoi de votre demande de swap !",
          type: "error"
        })
      })
    },
  },
  provide() {
    return {
      gameToExchangeSelected: this.$data.gameToExchangeSelected,
      gameWishSelected: this.$data.gameWishSelected,
      setToExchangeSelected: this.setToExchangeSelected,
      setWishSelected: this.setWishSelected,
      resetWishSelected: this.resetWishSelected,
      resetToExchangeSelected: this.resetToExchangeSelected,
      gameIsSelected: this.gameIsSelected,
      gameOwn: this.gameOwn,
      addOwn: this.addOwn,
      addGameOwnList: this.addGameOwnList,
    }
  },
};
</script>

<style scoped>
.exchange_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  background-color: #fafafa;
}

.gameExchange {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.user_game_container {
  background-color: white;
  width: 50%;
  padding: 2rem;
  margin: 1rem;
  border-radius: 2rem;
}

.recap_exchange {
  background-color: white;
  margin: 1rem;
  padding: 2rem;
  border-radius: 2rem;
  height: 600px;
}

.btn-swap {
  padding: 1rem;
  margin: 1rem;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 2rem;
  color: white;
}
</style>