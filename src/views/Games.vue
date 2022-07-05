<template>
  <b-container>
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="col-3 input-effect input-styling">
      <input class="effect-16" placeholder="Rechercher un jeu" v-model="searchQuery" @input="refreshRessource" />
      <span class="focus-border"></span>
    </div>
    <div v-if="resources">
      <Game v-for="(game, key) in resources" :key="game.id + key" :game="game" :inList="added(game)" />
    </div>
  </b-container>
</template>

<script>
import Game from "../components/Game/GameLayer.vue";
import Sidebar from "../components/Filter/SideBar.vue";
import { Igdb } from "../lib/Services/Igdb";
import { User } from "../lib/Services/User";

import jwt_decode from "jwt-decode";

export default {
  components: {
    Sidebar,
    Game,
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
  }),
  created() {
    if (this.$props.home) {
      this.refreshRessource()
    }
    this.getUser();
  },
  methods: {
    async refreshRessource() {
      var provider = new Igdb()
      var filters = this.$data.selectedFilters
      filters.page = "1"
      if (this.$data.searchQuery) {
        filters.name = this.$data.searchQuery
        provider.getPopulars(null, null, filters).then(response => { this.$data.resources = response })
      } else {
        filters.name = ""
        provider.getGames(null, null, filters).then(response => { this.$data.resources = response })
      }
    },
    updateFilters(filters, categorie) {
      this.$data.selectedFilters[categorie] = filters;
      if (this.checkEmptySelectedFilter(categorie)) {
        delete this.$data.selectedFilters[categorie]
      }
      this.refreshRessource()
      console.log(this.$data.selectedFilters)
    },
    checkEmptySelectedFilter(categorie = null) {

      if (categorie) {
        console.log(this.$data.selectedFilters?.[categorie])
        console.log(this.$data.selectedFilters?.[categorie]?.length)
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
    async getUser() {
      const providerUser = new User();
      var token = localStorage.getItem('token');
      var decoded = jwt_decode(token);

      providerUser.getUsers(null, null, { "email": decoded.email }).then(response => {
        if (response) {
          response?.ownGames ?? []
          var data = response?.ownGames ?? []
          if (Array.isArray(data)) {
            this.$data.UserList = data
          }
        }
      }).catch(error => {
        console.log(error)
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
</style>
