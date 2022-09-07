<template>
<transition name="bounce" appear appear-class="bounce-enter">
  <div class="container">
    <div v-bind:style="backgroundCover" class="card cover-bg" :class="[{ full: full, small: !full }]">
      <div class="bg-opacity">
        <div class="btn-list">
          <button @click="addOwn(game)"><img v-bind:class="{ disableOwn: own }" class="picto-nav"
              src="../../assets/images/check.svg" width="45" height="40"></button>
          <button @click="addWish(game)"><img v-bind:class="{ disableWish: wished }" class="picto-nav"
              src="../../assets/images/heart.svg" width="45" height="40"></button>
        </div>
        <div class="content">
          <div class="card-img">
            <img v-bind:src="coverPreUrl" width="80" height="80" loading="lazy">
          </div>
          <div class="card-title">
            <div class="card-title-text">
              <h3>{{ game.name }}</h3>
              <span class="rating">{{ Math.round(game.aggregated_rating) / 10 }}</span>
            </div>
            <div class="card-platforms-tags">
              <span v-for="(platform, key) in game.platforms" id="platforms" :key="key">{{ platform.name }}</span>
            </div>
          </div>
        </div>
        <div class="card-details">
          <div class="card-body">
            <div class="tags">
              <router-link v-for="(genre, key) in game.genres" :key="key" :to="'/games/genre/' + genre.id">
                <span id="genres" class="tag tag-teal">{{ genre.name }}</span>
              </router-link>
            </div>
            <p>
              {{ game.summary.slice(0, 500) }}
            </p>
            <div class="btn-wrapper">
              <router-link v-bind:to="showGameUrl">
                <span class="btn button_slide slide_left">Swaper</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { User } from "../../lib/Services/User";

export default {
  name: "GameLayer",
  components: {
  },
  data: () => ({
    filters: {},
    showDetails: false,
    wished: false,
    own: false,
  }),
  props: {
    game: {
      type: Object,
      required: false,
    },
    full: {
      type: Boolean,
      default: true,
    },
    inWishList: {
      type: Boolean,
      default: true,
    },
    inOwnList: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.wished = this.inWishList;
    this.own = this.inOwnList;
  },
  computed: {
    coverPreUrl: function () {
      return "//images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png";
    },
    showGameUrl: function () {
      return "/showGame/" + this.game.id;
    },
    backgroundCover: function () {
      return "background: url(https://images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png);background-repeat: no-repeat;background-size: cover;background-position: 50% 50%;";
    },
  },
  methods: {
    addOwn (game) {
      const provider = new User();

      provider.auth.me().then(response => {
        if (response) {
          var isExist = false
          var ownGames = response?.ownGames
          if (ownGames.length < 1) {
            ownGames.push(game.id)
            provider.patchUser(response.id, { 'ownGames': ownGames }).then(() => {
              this.$fire({
                title: "Jeu ajouté",
                text: "Jeu ajouté à votre liste de jeu possédés",
                type: "success",
              })
            }).then(() => {
              this.$data.own = true
            })
          }
          else {
            ownGames.forEach(element => {
              if (element == game.id) {
                isExist = true
              }
            });
            if (isExist == false) {
              ownGames.push(game.id)
              provider.patchUser(response.id, { 'ownGames': ownGames }).then(() => {
                this.$fire({
                  title: "Jeu ajouté",
                  text: "Jeu ajouté à votre liste de jeu possédés",
                  type: "success",
                })
              }).then(() => {
                this.$data.own = true
              })
            }
            else {
              this.$fire({
                title: "Vous possédez déjà ce jeu",
                text: "Vous avez déjà ajouté ce jeu à votre liste de jeu possédés",
                type: "warning",
              })
            }
          }
        }
      })
        .catch(() => {
          this.$alert("Une erreur est survenu, veuillez réessayer", "Erreur", {
            type: "error",
          });
        })
    },
    addWish(game) {
      const provider = new User();

      provider.auth.me().then(response => {
        if (response) {
          var isExist = false
          var wishGames = response?.wishGames
          if (wishGames.length < 1) {
            wishGames.push(game.id)
            provider.patchUser(response.id, { 'wishGames': wishGames }).then(() => {
              this.$fire({
                title: "Jeu ajouté",
                text: "Jeu ajouté à votre liste de jeu souhaités",
                type: "success",
              })
            }).then(() => {
              this.$data.wished = true
            })
          }
          else {
            wishGames.forEach(element => {
              if (element == game.id) {
                isExist = true
              }
            });
            if (isExist == false) {
              wishGames.push(game.id)
              provider.patchUser(response.id, { 'wishGames': wishGames }).then(() => {
                this.$fire({
                  title: "Jeu ajouté",
                  text: "Jeu ajouté à votre liste de jeu souhaités",
                  type: "success",
                })
              }).then(() => {
                this.$data.wished = true
              })
            }
            else {
              this.$fire({
                title: "Vous souahitez déjà ce jeu",
                text: "Vous avez déjà ajouté ce jeu à votre liste de jeu souhaités",
                type: "warning",
              })
            }
          }
        }
      })
        .catch(() => {
          this.$fire({
            title: "Une erreur est survenu, veuillez réessayer",
            text: "Erreur",
            type: "error",
          });
        })
    },

  },
};

</script>

<style scoped>
.btn-wrapper {
  display: flex;
  justify-content: end;
  margin-right: 15px;
}

.btn {
  /* line-height: 50px; */
  /* height: 50px; */
  text-align: center;
  /* width: 250px; */
  cursor: pointer;
  color: #FF5D19;
  transition: background-color 0.3s ease-in-out;
  position: relative;
}

.btn:hover {
  background-color: #FF5D19;
  color: #fff;
}

.button_slide {
  border: 2px solid #FB5D19;
  padding: 10px 10px;
  border-radius: 7px;
  display: inline-block;
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #FB5D19;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.slide_left:hover {
  box-shadow: inset 0 0 0 40px #FB5D19;
  color: white;
  border-radius: 7px;
}

.container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
  max-width: 1200px;
}

.container .card {
  position: relative;
  border: none;
  width: 20rem;
  height: 30rem;
  background: rgba(255, 255, 255, 0.05);
  margin: 1rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  border-radius: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
}

.container .card.small {
  width: 20rem;
  height: 30rem;
}

.container .card.full {
  width: 100%;
  height: 30rem;
}

.card-body p {
  font-size: 1rem;
  /* margin: 0 0 40px; */
}

.container .card .content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
}

.container .card .content .card-img {
  top: 2em;
  width: 16.375rem;
  height: 22.375rem;
  position: relative;
  overflow: visible;
  transition: 0.5s ease-in-out;
}

.container .card .content .card-img img {
  position: absolute;
  width: 100%;
  border-radius: 15px;
  height: auto;
  object-fit: cover;
}

.container .card.full:hover .content .card-img img {
  box-shadow: -10px 10px 15px rgb(0 0 0 / 50%);
  transition: all 0.3s ease-out;
}

.container .card .content .card-title {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 2.5rem;
  transition: 0.5s ease-in-out;
  /* top: 2em; */
  width: 9.375rem;
  height: 9.375rem;
}


.container .card .content .card-title {
  color: rgba(255, 93, 25, 1);
  text-transform: uppercase;
  letter-spacing: 0.125rem;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.1em;
  width: 750px;
}

.container .card .content .card-title .card-platforms-tags {
  font-size: 0.75rem;
  width: 100%;
  text-transform: initial;
  transition: 0.5s ease-in-out;
}

.container .card .content .card-title .card-platforms-tags span {
  margin: 2%;
  text-transform: initial;
}

.container .card .card-details {
  position: absolute;
  bottom: 1em;
  left: 2vw;
  display: flex;
  margin-left: 200px;
}

@media only screen and (max-width: 414px) {
  .container .card .card-details {
    position: absolute;
    bottom: 1em;
    display: flex;
    margin-left: 0px;
  }
}

.container .card .card-details .card-body {
  list-style: none;
  margin: 0 10px;
  transform: translateY(2%);

  transition: all 0.75s ease-out;
  opacity: 0;
}

.container .card .card-details .card-body .tags {
  display: flex;
  flex-wrap: wrap;
}

.container .card .card-details .card-body a {
  color: rgba(255, 93, 25, 1);
  font-size: 1.25rem;
}

.tag {
  background: #cccccc;
  border-radius: 10px;
  font-size: 8px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0.5rem;
}

.tag:hover {
  background: #fff;
  color: #cccccc;
}

.tag-teal {
  background-color: rgba(255, 93, 25, 1);
}

.card-title-text {
  display: flex;
  justify-content: space-between;
}

.rating {
  align-self: center;
  font-size: xx-large;
  background-color: rgba(255, 93, 25, 1);
  padding: 14px;
  border-radius: 10px;
  color: white;
}

.container .card.full:hover .content {
  transform: translateY(-30%);
}

.container .card.small:hover .content {
  transform: translateY(-50%);
}

.container .card.small:hover .content .card-title .card-platforms-tags {
  opacity: 0;
}

.container .card:hover .card-details .card-body {
  transform: translateY(0vmin);
  opacity: 1;
}

/* .container .card:hover .content .card-img {
  top: 2em;
	width: 3em;
  height: 3em;
}

.container .card:not(:hover) .content .card-img {
  top: 2em;
	width: 3em;
  height: 3em;
  width: 9.375rem;
	height: 9.375rem;
} */

.container .card.small:hover .content .card-img {
  width: 3rem;
  height: 3rem;
  max-width: 15vw;
  max-height: 15vw;
}

/* 
.container .card.small:not(:hover) .content .card-img {
  top: 2em;
  width: 9.375rem;
	height: 9.375rem;
  max-width: 30vw;
  max-height: 30vw;
} */

.container .card.full:hover .content .card-img {
  top: 5rem;
  width: 16.375rem;
  height: 22.375rem;
  transform: translate(-7vw, 5vw);
}

.container .card.full:hover .content .card-title {
  transform: translate(-8vw, 0vh);

}

.card-title {
  width: webkit-fill-available;
}

.btn-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -30px;
  top: 25px;
  height: 140px;
  border-radius: 15px;
  justify-content: space-between;
  background-color: white;
  padding: 15px 10px 15px 0px;
  box-shadow: 0 15px 35px rgb(0 0 0 / 25%);
  border: 3px rgb(28 93 102) solid;
  z-index: 1;
}

.bg-opacity {
  background-color: rgba(255, 255, 255, 0.9);
  height: 100%;
  width: 100%;
  border-radius: 15px;
}

.disableOwn {
  opacity: 0.2;
  cursor: not-allowed;
}

.disableWish {
  opacity: 0.2;
  cursor: not-allowed;
}

button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

/* .container .card.full:not(:hover) .content .card-img {
  top: 2em;
  width: 9.375rem;
	height: 9.375rem;
} */

@media screen and (max-width: 400px) {
  .container .card:hover .content {
    opacity: 0;
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
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>