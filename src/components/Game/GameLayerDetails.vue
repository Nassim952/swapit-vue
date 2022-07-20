<template>
  <div class="container">
    <div v-bind:style="backgroundCover" class="container-game-layer">
        <div class="game-layer">
            <div class="game-img">
                    <img v-bind:src="coverPreUrl" width="80" height="80">
            </div>
            <div class="info-game">
                <div class="title-game">{{game.name}}</div>
                <div class="game-details">
                    <div class="game-desc">{{game.summary}}</div>
                    <div class="detail-plus">
                      <div class="game-rating">{{Math.round(game.aggregatedRating)/10}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="user-card-container">
      <UserCard v-for="(user, key) in users" :key="user.id + key" :user="user" :game="game" />
    </div>
  </div>
</template>

<script>
import {Igdb} from "../../lib/Services/Igdb";
// import {User} from "../../lib/Services/User";
import UserCard from "./UserCard.vue";
import { UserAdmin } from "../../lib/Services/UserAdmin";

export default {
  name: "GameLayerDetails",
  components: {
    UserCard,
  },
  data: () => ({
    filters: {},
    game: {},
    users: [],
  }),
  computed: {
    coverPreUrl: function () {
      return "//images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png";
    },
    backgroundCover: function () {
      return "background: url(https://images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png);";
    },
  },
  methods: {
    getGame: async function () {
      var provider = new Igdb()
      provider.getGame(this.$route.params.id).then(response => {
        this.$data.game = response
      })
    },
    getUsers: async function () {
      var provider = new UserAdmin()
      provider.getUsers(null, null, { "owned_games" : this.$route.params.id }).then(response => {
        this.$data.users = response
      })
    },
  },
  created() {
    this.getGame();
    this.getUsers();
  },
};
</script>

<style scoped>
.container-game-layer {
    min-width: 1000px;
    height: 200px;
    border-radius: 20px;
    margin: 10px 20px;
    display: flex;
    background-repeat: no-repeat!important;
    background-size: cover!important;
    background-position: 50% 50%!important;
}
.user-card-container {
    display: flex;
    flex-wrap: wrap;
    width: -webkit-fill-available;
    justify-content: space-evenly;
    align-items: center;
}
.game-layer {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    padding: 20px;
    width: 100%;
}
.game-img{
    width: auto;
    height: 100%;
    border-radius: 20px;
    margin-right: 40px;
}
.game-img img{
    width: auto;
    height: 100%;
    border-radius: 20px;
}
.info-game{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    font-weight: bold;
}
.title-game{
    font-size: 27px;
    color: rgba(255, 93, 25, 1);
    margin-bottom: 10px;
}
.game-desc{
    width: 50%;
    font-size: 12px;
    color: rgba(41, 100, 124);
    height: 90px;
    overflow: hidden;
}
.game-details{
    display: flex;
    justify-content: space-between;
}
.detail-plus{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.game-platforms{
    font-size: 10px;
    color: white;
    background-color: rgba(255,93,25,1);
    border-radius: 5px;
    padding: 2px;
    margin-bottom: 5px;
}
.game-modes{
  font-size: 10px;
    color: white;
    background-color: rgba(41, 100, 124, 1);
    border-radius: 5px;
    padding: 2px;
}
.game-rating{
  align-self: center;
  font-size: 36px;
  color: rgba(255, 93, 25, 1);
}
</style>