<template>
    <div class="shadow content-container">
        <div class="navbar-ctn">
            <div class="flex-logo">
                <router-link to="/">
                    <div class="logo">
                        <img src="../../assets/images/logo.svg" width="60" height="30">
                        <img src="../../assets/images/logo-text.svg" width="60" height="30">
                    </div>
                </router-link>
                <div class="img-game">
                    <router-link to="/games"><img class="picto-nav" src="../../assets/images/game-console.png" width="35" height="35"></router-link>
                </div>
            </div>
           
            
            
            <!-- <SearchInput @input="updateQuery" :enableSuggestion="!home" @actif="actifSearch = !actifSearch"/> -->
            
            <div class="picto-ctn">
                <div class="sign-container">
                    <router-link to="/signin" class="link-nav">Connexion</router-link>
                    <router-link to="/signup" class="link-nav">Inscription</router-link>
                </div>
                <router-link to="/popularGames"><img class="picto-nav" src="../../assets/images/popularity.png" width="27" height="27"></router-link>
                <router-link to="/owngameslist"><img class="picto-nav" src="../../assets/images/check.svg" width="25" height="20"></router-link>
                <router-link to="/wishgameslist"><img class="picto-nav" src="../../assets/images/heart.svg" width="20" height="20"></router-link>
                <router-link to="/profile"><img class="picto-nav" src="../../assets/images/user.svg" width="25" height="20"></router-link>
                <button id="logout-btn" class="logout-btn" @click="logout"><img class="picto-nav" src="../../assets/images/logout.svg" width="20" height="20"></button>
            </div>
        </div>
        <SideBar v-if="home && actifSearch "/>
        <div v-if="home">
            <div v-if="resources">
                <GameLayer v-for="(game,key) in resources" :key="game.id+key" :game="game"/>
            </div>
        </div>
    </div>
</template>

<script>
    // import SearchInput from "./SearchInput.vue"
    // import GameLayer from "../Game/GameLayer.vue";
    import SideBar from "../Filter/SideBar.vue";
    import {Igdb} from "../../lib/Services/Igdb";
    // import User from "../../lib/Services/User.js";
    export default {
        components: {
            // GameLayer,
            SideBar,
            // SearchInput
        },
        props: {
            home: {
                type: Boolean,
                default: true
            },
        },
    data: () => ({
        searchQuery: null,
        resources: [],
        selectedFilters: {},
        actifSearch: false,
    }),
    created() {
        if(this.$props.home){
            this.refreshRessource()
        }
    },
    methods:{
        logout() {
            localStorage.clear();
        },
        async refreshRessource() {
            var provider = new Igdb()
            var filters = this.$data.selectedFilters
            filters.name = this.$data.searchQuery ?? ""
            provider.getPopulars(null, null, filters).then(response => { this.$data.resources = response})
        }, 
        updateFilters(filters, categorie) {
            this.$data.selectedFilters[categorie] = filters;
            if (this.checkEmptySelectedFilter(categorie)) {
                delete  this.$data.selectedFilters[categorie]
            }
            this.refreshRessource()
            console.log(this.$data.selectedFilters)
        },
        checkEmptySelectedFilter(categorie = null) {

            if (categorie) {
                console.log(this.$data.selectedFilters?.[categorie])
                console.log(this.$data.selectedFilters?.[categorie]?.length)
                // if(this.$data.selectedFilters?.[categorie]){
                    return this.$data.selectedFilters?.[categorie]?.length === 0 
                // }
              
            } else if (!this.$data.selectedFilters) {
                return true
            }
            
        },
        updateQuery(value) {
            this.$data.searchQuery = value
            this.refreshRessource()
        }
    },
     provide() {
        return {
            updateFilters: this.updateFilters,
        }
  },
    
    }
</script>

<style>
.flex-logo{
    width: 200px;
    display: flex;
    justify-content: space-evenly;
}

.navbar-ctn{
    display: flex;
    height: auto;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    height: 65px;
}
.picto-ctn{
    display: flex;
    justify-content: center;
    width: 400px;
}
.picto-nav{
    margin-left: 10px;
}

.search-input{
    background-color: rgba(41, 100, 124, 0.2);
    color: rgba(41, 100, 124);
    border-radius: 5px;
    border: none;
    width: 300px;
    height: 30px;
    padding: 5px;
    margin-bottom: 30px;
}
.search-input:focus{
  outline: rgba(41, 100, 124) 2px solid;
}

.logout-btn{
    background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

.content-container{
    margin-bottom: 30px;
}

.sign-container{
    width: 200px;
    display: flex;
    justify-content: space-around;
}

.link-nav{
    text-decoration: none;
    color: rgba(41, 100, 124);
}

.link-nav:hover{
    color: #FB5D19;
    transition: color 0.2s;
}

</style>