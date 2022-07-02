<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <img v-bind:src="coverPreUrl">
      </div>
      <div class="card-body">
        <span class="tag tag-teal">{{ game.name }}</span>
        <h4>
          {{ game.summary }}
        </h4>
        <p>
          {{ game.summary }}
        </p>
      </div>
    </div>
    <UserCard v-for="(user, key) in users" :key="user.id + key" :user="user" :game="game" />
  </div>
</template>

<script>
import {Igdb} from "../../lib/Services/Igdb";
import {User} from "../../lib/Services/User";
import UserCard from "./UserCard.vue";

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
  },
  methods: {
    getGame: async function () {
      var provider = new Igdb()
      provider.getGame(this.$route.params.id).then(response => {
        this.$data.game = response
      })
    },
    getUsers: async function () {
      var provider = new User()
      provider.getUsers(null, null, { "owned_games"  : this.$route.params.id }).then(response => {
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
.flex-game-layer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 250px;
}

* {
  box-sizing: border-box;
}

.card {
  margin: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
}

.card-header img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 250px;
}

.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
}

.tag-teal {
  background-color: #47bcd4;
}

.tag-purple {
  background-color: #5e76bf;
}

.tag-pink {
  background-color: #cd5b9f;
}

.card-body p {
  font-size: 13px;
  margin: 0 0 40px;
}
</style>