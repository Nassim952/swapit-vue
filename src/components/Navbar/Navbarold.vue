<template>
    <div>
        <b-navbar class="shadow" toggleable="lg" type="light" variant="light">
            <b-navbar-brand>
                <router-link to="/">
                    <div class="logo">
                        <img src="../../assets/images/logo.svg" width="60" height="30">
                        <img src="../../assets/images/logo-text.svg" width="60" height="30">
                    </div>
                </router-link>
                
            </b-navbar-brand>

            

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="w-100 d-flex justify-content-between">
                    <b-nav-item>
                        <router-link v-show="logged" to="/games" style="font-size: smaller" class="link-nav p-3">
                            <img class="picto-search" src="../../assets/icones/search.svg" width="25" height="25"> <span class="nav-item-mobile">Rechercher</span>
                        </router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link v-if="hidden" to="/signin" class="link-nav p-3">Connexion</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link v-if="hidden" to="/signup" class="link-nav p-3">Inscription</router-link>
                    </b-nav-item>
                    <div v-if="logged">
                        <b-nav-item-dropdown  v-if="notifications.length">
                            <template #button-content>
                                <span class="link-nav p-2 position-relative">
                                    <b-icon-bell-fill></b-icon-bell-fill>
                                    <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                                        {{notifications.length}}
                                    </span>
                                </span>
                            </template>
                            <b-dropdown-item v-for="notification in notifications" :key="notification.id"  href="#">
                                <span v-if="notification.refTable == 'Exchange'">{{ notification.refTable }}</span>
                                <span v-if="notification.refTable == 'Message'">
                                    <router-link :to="'/chat/' + notification.idTable"  @click.native="deleteNotification(notification)">
                                    {{notification.description}}  
                                    </router-link>
                                </span>
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                        <div v-else >
                            <template >
                                <span class="link-nav p-2 position-relative">
                                    <b-icon-bell-fill></b-icon-bell-fill>
                                    <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                                        {{notifications.length}}
                                    </span>
                                </span>
                            </template>
                        </div>
                    </div>
                    
                    <b-navbar-nav>
                        <b-nav-item>
                            <router-link v-if="logged" to="/popularGames" style="font-size: smaller" class="link-nav p-3">
                                <img src="../../assets/images/popularity.png" width="25" height="25"> <span class="nav-item-mobile">Populaires</span>
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link v-if="logged" to="/owngameslist" style="font-size: smaller" class="link-nav p-3">
                                <img src="../../assets/images/check.svg" width="25" height="25"> <span class="nav-item-mobile">Ownlist</span>
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link v-if="logged" to="/wishgameslist" style="font-size: smaller" class="link-nav p-3">
                                <img src="../../assets/images/heart.svg" width="25" height="25"> <span class="nav-item-mobile">Wishlist</span>
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link v-if="logged" to="/profile" style="font-size: smaller" class="link-nav p-3">
                                <img src="../../assets/images/user.svg" width="25" height="25"> <span class="nav-item-mobile">Profil</span>
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <button v-if="logged" id="logout-btn" style="font-size: smaller" class="logout-btn link-nav px-3" @click="logout">
                                <img src="../../assets/images/logout.svg" width="25" height="25"> <span class="nav-item-mobile">Déconnexion</span>
                            </button>
                        </b-nav-item>
                    </b-navbar-nav>
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
import { User } from "../../lib/Services/User";
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
        notifications:[]
    }),
    created() {
        if (localStorage.getItem("token")) {
            this.$data.logged = true
            this.$data.hidden = false
        }
        this.getNotifications()
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/");
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
        async getNotifications() {
            var provider = new User()
            provider.auth.me().then(response => {
                if(response){
                    provider.getNotifications(response.id).then(response => {
                        if(response){
                            this.$data.notifications = response
                        }
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        },
        async deleteNotification(notification) {
            var provider = new User()
            provider.delNotification(notification.id).then(response => {
                if(response){
                    console.log(response)
                    this.getNotifications()
                }
            })
            .catch(error => {
                console.log(error)
            })
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

.nav-item-mobile {
    margin-left: 5px;
}

@media screen and (min-width: 993px) {
    .nav-item-mobile {
        display: none;
    }
}
</style>