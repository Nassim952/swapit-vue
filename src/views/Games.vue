<template>
  <b-container>
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="col-3 input-effect input-styling">
      <input class="effect-16" placeholder="Rechercher un jeu" v-model="searchQuery" />
      <Button class="search" title="Rechercher" :onClick="refreshRessource" />
      <span class="focus-border"></span>
    </div>
    <!-- <div class="loader" v-if="loading"></div> -->
    <div v-if="resources">
      <Game v-for="(game, key) in resources" :key="game.id + key" :game="game" :inWishList="addedWish(game)" :inOwnList="addedOwn(game)" />
      <div class="pagination">
        <div v-if="searchQuery == null">
          <span v-for="index in resources.length" :key="index">
            <button class="button-pagination" :class="{ 'active': index == page }" v-on:click="changePage(index)">{{
                index
            }}</button>
          </span>
        </div>
        <div v-else>
          <span v-for="index in 1" :key="index">
            <button class="button-pagination" :class="{ 'active': index == page }" v-on:click="changePage(index)">{{
                index
            }}</button>
          </span>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import Game from "../components/Game/GameLayer.vue";
import Sidebar from "../components/Filter/SideBar.vue";
import { Igdb } from "../lib/Services/Igdb";
import { User } from "../lib/Services/User";
import Button from '../components/Buttons/Button.vue';

export default {
  components: {
    Sidebar,
    Game,
    Button,
  },
  props: {
    games: {
      type: Array,
    },
  },
  data: () => ({
    searchQuery: null,
    resources: [],
    selectedFilters: {},
    filter: false,
    UserList: [],
    loading: false,
    perPage: 10,
    page: 1,
    UserWishList: [],
    UserOwnList: [],
  }),
  created() {
    if (this.$route.params.id) {
      this.selectedFilters.genres = [this.$route.params.id]
    }

    this.refreshRessource()
    this.getUser();
  },
  methods: {
    async refreshRessource() {
      this.$isLoading(true)
      var provider = new Igdb()
      var filters = this.$data.selectedFilters

      if (this.$data.searchQuery) {
        filters.page = 1
        filters.perPage = this.$data.perPage
        filters.slug = this.$data.searchQuery
        provider.getPopulars(null, null, filters).then(response => {
          if (response.length > 0) {
            this.$data.resources = response
            this.$isLoading(false)
          } else {
            this.$isLoading(false)
            this.$fire({
              title: "Aucun résultat",
              text: "Aucun résultat ne correspond à votre recherche",
              type: "info",
            })
          }
        })
      } else {
        filters.page = this.$data.page
        filters.slug = ""
        filters.perPage = this.$data.perPage
        provider.getGames(null, null, filters).then(response => {
          this.$data.resources = response
          this.$isLoading(false)
        })
      }
    },
    addedWish(game) {
      // this.$data.UserList = [];
      // console.log(this.$data.UserList)
      return this.$data.UserWishList.some(e => e === game.id)
    },
    addedOwn(game) {
      // this.$data.UserList = [];
      // console.log(this.$data.UserList)
      return this.$data.UserOwnList.some(e => e === game.id)
    },
    updateFilters(filters, categorie) {
      this.$data.selectedFilters[categorie] = filters;
      if (this.checkEmptySelectedFilter(categorie)) {
        delete this.$data.selectedFilters[categorie]
      }
      this.refreshRessource()
    },
    checkEmptySelectedFilter(categorie = null) {

      if (categorie) {
        if (this.$data.selectedFilters?.[categorie]) {
          return this.$data.selectedFilters?.[categorie]?.length === 0
        }
        return true

      } else if (!this.$data.selectedFilters) {
        return true
      }

    },
    added(game) {
      // this.$data.UserList = [];
      return this.$data.UserList.some(e => e === game.id);
    },
    changePage(page) {
      this.$data.page = page;
      window.scrollTo(0, 0);
      this.refreshRessource();
    },
    async getUser() {
      const providerUser = new User();

      providerUser.auth.me().then(response => {
        if (response) {
          response?.ownGames ?? []
          var data = response?.ownGames ?? []
          if (Array.isArray(data)) {
            this.$data.UserList = data
          }
        }
      }).catch(() => {
        this.$fire({
          title: "Erreur",
          message: "Vous devez être connecté pour accéder à cette page",
          type: "error",
        })
      })
    },
  },
  provide() {
    return {
      updateFilters: this.updateFilters,
    }
  },
};
</script>

<style scoped>
.input-styling {
  width: -webkit-fill-available !important;
  display: flex;
  justify-content: center;
}

.effect-16 {
  border: 0;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
}

.effect-16~.focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #FB5D19;
  transition: 0.4s;
}

.effect-16:focus~.focus-border,
.has-content.effect-16~.focus-border {
  width: 100%;
  transition: 0.4s;
}

.effect-16~label {
  position: absolute;
  left: 0;
  width: 100%;
  top: 9px;
  color: #aaa;
  transition: 0.3s;
  z-index: -1;
  letter-spacing: 0.5px;
}

.effect-16:focus~label,
.has-content.effect-16~label {
  top: -16px;
  font-size: 12px;
  color: #FB5D19;
  transition: 0.3s;
}

@import url("https://fonts.googleapis.com/css?family=Damion|Muli:400,600");

body {
  font-family: "Muli", sans-serif;
  background: url("https://www.toptal.com/designers/subtlepatterns/patterns/geometry2.png");
}

h2 {
  font-family: "Damion", cursive;
  font-weight: 400;
  color: #FB5D19;
  font-size: 35px;
  text-align: center;
  position: relative;
}

h2:before {
  position: absolute;
  content: "";
  width: 100%;
  left: 0;
  top: 22px;
  background: #FB5D19;
  height: 1px;
}

h2 i {
  font-style: normal;
  background: #fff;
  position: relative;
  padding: 10px;
}

:focus {
  outline: none;
}

/* necessary to give position: relative to parent. */
input[type="text"] {
  font: 15px/24px "Muli", sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}

:focus {
  outline: none;
}

.col-3 {
  float: left;
  width: 27.33%;
  margin: 40px 3%;
  position: relative;
}

/* necessary to give position: relative to parent. */
input[type="text"] {
  font: 15px/24px "Lato", Arial, sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}

.effect-16,
.effect-17,
.effect-18 {
  border: 0;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
}

.effect-16~.focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #FB5D19;
  transition: 0.4s;
}

.effect-16:focus~.focus-border,
.has-content.effect-16~.focus-border {
  width: 100%;
  transition: 0.4s;
}

.effect-16~label {
  position: absolute;
  left: 0;
  width: 100%;
  top: 9px;
  color: #aaa;
  transition: 0.3s;
  z-index: -1;
  letter-spacing: 0.5px;
}

.effect-16:focus~label,
.has-content.effect-16~label {
  top: -16px;
  font-size: 12px;
  color: #FB5D19;
  transition: 0.3s;
}

.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.loader {
  /* Loader Div Class */
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: #eceaea;
  background-image: url('../assets/gif/loader-color.gif');
  background-size: 500px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10000000;
  opacity: 0.4;
  filter: alpha(opacity=40);
}

.pagination {
  display: flex;
  justify-content: center;
  width: 100%;
}

.button-pagination {
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: white;
  border: 2px solid #FB5D19;
  color: #FB5D19;
}

.active {
  background-color: #FB5D19;
  color: #fff;
  border: none;
}
</style>
