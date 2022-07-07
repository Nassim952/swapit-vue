<template>
  <div id="Game_Exchange" class="exchange_container">
    <div class="gameExchange">
      <div class="to_exchange user_game_container">
        <div>Jeux Possedés de {{ user.username }}</div>
        <GamesToExchange :games="gamesToExchange" />
      </div>
      <div class="wish_exchange user_game_container">
        <div>Jeux Souhaitées de {{ user.username }}</div>
        <GamesWishExchange :games="gamesWish" />
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
import jwt_decode from "jwt-decode";
import { User } from '../../lib/Services/User';
import { Igdb } from '../../lib/Services/Igdb';
import { Exchange } from '../../lib/Services/Core/Exchange';

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
  }),
  computed: {

  },
  created() {
    this.getGamesToExchange();
    this.getGamesWish();
    this.getGameWishSelected();
    this.getUser();
  },
  methods: {
    getUser: async function () {
      var provider = new User()
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
      var providerUser = new User();
      var providerGame = new Igdb();
      providerUser.getUser(this.$route.params.userid).then(response => {
        response.ownGames.forEach(element => {
          providerGame.getGame(element).then(response => {
            this.$data.gamesToExchange.push(response);
          });
        });
      });
    },
    getGamesWish: async function () {
      var providerUser = new User();
      var providerGame = new Igdb();
      providerUser.getUser(this.$route.params.userid).then(response => {
        response.wishGames.forEach(element => {
          providerGame.getGame(element).then(response => {
            this.$data.gamesWish.push(response);
          });
        });
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
    gameIsSelected: function (game) {
      return (this.gameToExchangeSelected && this.gameToExchangeSelected.id == game.id) || (this.gameWishSelected && this.gameWishSelected.id == game.id)
    },
    HandleSubmit: async function () {
      var provider = new Exchange();
      var providerUser = new User();

      var token = localStorage.getItem('token');
      var decoded = jwt_decode(token);

      providerUser.getUsers(null, null, { "email": decoded.email }).then(response => {
        if (response) {
          provider.postExchange({
            owner: "users/" + this.$data.user.id,
            proposer: "users/" + response[0].id,
            proposerGame: this.$data.gameToExchangeSelected.id,
            senderGame: this.$data.gameWishSelected.id
          }).then(response => { console.log(response); })
        }
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