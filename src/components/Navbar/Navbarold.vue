<template>
    <div>
        <b-navbar  toggleable="lg" type="light" variant="light">
            <b-navbar-brand >
                <router-link to="/">
                    <div class="logo">
                        <img src="../../assets/images/logo.svg" width="60" height="30">
                        <img src="../../assets/images/logo-text.svg" width="60" height="30">
                    </div>
                </router-link>
                <div class="img-game">
                    <router-link v-show="logged" to="/games"><img class="picto-nav picto-search"
                            src="../../assets/icones/search.svg" width="30" height="30"></router-link>
                </div>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link v-if="hidden" to="/signin" class="link-nav p-3">Connexion</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link v-if="hidden" to="/signup" class="link-nav p-3">Inscription</router-link>
                    </b-nav-item>

                    <b-nav-item-dropdown>
                        <template #button-content>
                            <span class="link-nav p-2 position-relative">
                                <b-icon-bell-fill></b-icon-bell-fill>
                                <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                                    4
                                </span>
                            </span>
                        </template>
                        <b-dropdown-item href="#">1 nouveau message</b-dropdown-item>
                        <b-dropdown-item href="#">Naruto vous a envoyé un clone</b-dropdown-item>
                        <b-dropdown-item href="#">Joyeux anniversaire</b-dropdown-item>
                        <b-dropdown-item href="#">Wesh bien ?</b-dropdown-item>
                    </b-nav-item-dropdown>
                    
                    
                    <b-nav-item>
                        <router-link v-if="logged" to="/popularGames"><img class="picto-nav" src="../../assets/images/popularity.png" width="27" height="27"></router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link v-if="logged" to="/owngameslist"><img class="picto-nav" src="../../assets/images/check.svg" width="25" height="20"></router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link v-if="logged" to="/wishgameslist"><img class="picto-nav" src="../../assets/images/heart.svg" width="20" height="20"></router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link v-if="logged" to="/profile"><img class="picto-nav" src="../../assets/images/user.svg" width="25" height="20"></router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <button v-if="logged" id="logout-btn" class="logout-btn" @click="logout"><img class="picto-nav" src="../../assets/images/logout.svg" width="20" height="20"></button></b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <SideBar v-if="home && actifSearch" />
        <div v-if="home">
            <div v-if="resources">
                <GameLayer v-for="(game, key) in resources" :key="game.id + key" :game="game" />
            </div>
        </div>
    </div>
</template>

<script>
// import SearchInput from "./SearchInput.vue"
// import GameLayer from "../Game/GameLayer.vue";
import SideBar from "../Filter/SideBar.vue";
import { Igdb } from "../../lib/Services/Igdb";
// import { User } from "../../lib/Services/User";
// import jwt_decode from "jwt-decode";

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
        logged: false,
        hidden: true,
    }),
    created() {
        if (localStorage.getItem("token")) {
            this.$data.logged = true
            this.$data.hidden = false
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/signin");
        },
        async refreshRessource() {
            var provider = new Igdb()
            var filters = this.$data.selectedFilters
            filters.name = this.$data.searchQuery ?? ""
            provider.getPopulars(null, null, filters).then(response => { this.$data.resources = response })
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
        },
        ProfilePreUrl() {
            // var provider = new User()

            // if (localStorage.getItem("token")) {
            //     var decoded = jwt_decode(localStorage.getItem("token"))
            //     provider.getUsers(null, null, { 'email': decoded.email }).then(response => {
            //         response = response.shift()
            //         provider.getReceivedExchanges(response.id).then(response => {
            //             if (response) {
            //                 return "../../assets/images/notification.png"
            //             }
            //             else {
            //                 return "../../assets/images/user.svg"
            //             }
            //         })
            //     })
            // }
            // else{
            //     return "../../assets/images/user.svg"
            // }
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
.flex-logo {
    width: 200px;
    display: flex;
    justify-content: space-evenly;
}

.navbar-ctn {
    display: flex;
    height: auto;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    height: 65px;
}

.picto-ctn {
    display: flex;
    justify-content: center;
    width: 400px;
}

.picto-nav {
    margin-left: 10px;
}

.picto-nav:hover {
    transform: translateY(-20%);
    transition: ease-out 0.3s;
}

.search-input {
    background-color: rgba(41, 100, 124, 0.2);
    color: rgba(41, 100, 124);
    border-radius: 5px;
    border: none;
    width: 300px;
    height: 30px;
    padding: 5px;
    margin-bottom: 30px;
}

.search-input:focus {
    outline: rgba(41, 100, 124) 2px solid;
}

.logout-btn {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.content-container {
    margin-bottom: 30px;
}

.sign-container {
    width: 200px;
    display: flex;
    justify-content: space-around;
}

.link-nav {
    text-decoration: none;
    color: rgba(41, 100, 124);
}

.link-nav:hover {
    color: #FB5D19;
    transition: color 0.2s;
}

.picto-search {
    border: 2px solid #FB5D19;
    padding: 5px;
    border-radius: 7px;
    box-shadow: inset 0 0 0 0 #FB5D19;
    transition: ease-out 0.7s;
}

.picto-search:hover {
    background-color: #fb5d197d;
    box-shadow: inset 0 0 0 40px #FB5D19;
    color: white;
    border-radius: 7px;
}
</style>