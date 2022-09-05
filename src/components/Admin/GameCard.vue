<template>
  <div class="game_card">
    <router-link :to="'/showGame/' + game.id">
      <img v-bind:src="coverPreUrl" class="icon">
    </router-link>
    <div class="card-body text-center">
      <p class="m-0" style="font-size: 0.7rem;">{{ game.name }}</p>
      <span v-for="(genre, key) in game.genres.slice(0, 1)" id="genres" :key="key" class="tag tag-teal" style="font-size: 0.6rem;">{{ genre.name }}</span>
    </div>
  </div>
</template>

<script>
// import { Igdb } from '../../lib/Services/Igdb'

export default {
  props: {
    game: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      genres: [],
      platforms: [],
    }
  },
  computed: {
    coverPreUrl: function () {
      return "//images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png";
    },
    backgroundCover: function () {
      return "background: url(https://images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png);background-repeat: no-repeat;background-size: cover;background-position: 50% 50%;";
    },
    showGameUrl() {
      return "/game/" + this.game.id;
    }
  },
};
</script>

<style scoped>
.cover-game-card {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
}

.btn-supp-wrapper{
  margin-top: 105px;
}

.game-card-info-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.profil-game-card-container {
  width: -webkit-fill-available;
  margin-top: 10px;
}

.game-rating {
  color: #384546;
}

.game-container {
  height: 130px;
  margin-left: 15px;
}

.info-game-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
  color: #384546;
}

.game-name {
  color: #384546;
  font-weight: bold;
  font-size: larger;
}

.cover-wrap {
  display: flex;
  justify-content: space-between;
}

.btn-delete-exchange {
  background-color: rgb(252, 87, 87);
  border: none;
  border-radius: 10px 10px 10px 10px;
  color: white;
  transition: all 0.3s ease;
  padding: 3px 10px;
  position: absolute;
  margin-top: 5px;
  margin-right: 5px;
  margin-left: 75px;
}

.btn-delete-exchange:hover {
    background-color: rgb(173, 0, 0);
}

.game_card {
  width: 7rem;
  border-radius: 1rem;
  overflow: hidden;
  margin: 1rem;
  box-shadow: 0px 1px 10px lightgray;
}

.icon-wrapper {
  margin: auto;
}

.icon {
  width: 100%;
  height: auto
}

.card-body {
  padding: 5px
}

.card-footer {
  padding: 5px
}

@media screen and (max-width: 990px) {
  .game_card{
    width: 15rem;
  }

  .btn-delete-exchange {
    background-color: rgb(252, 87, 87);
    border: none;
    border-radius: 10px 10px 10px 10px;
    color: white;
    transition: all 0.3s ease;
    padding: 3px 10px;
    position: absolute;
    margin-top: 5px;
    margin-right: 5px;
    margin-left: 205px;
  }
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>