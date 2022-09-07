<template>
    <div class="row m-auto">
        <transition name="fade" appear appear-class="fade-enter">
            <modal v-if="isOpenModal"> 
            </modal>
        </transition>
        <div class="col">
            <div class="row justify-content-between">
                <div class="col-xl-4  m-lg-5">
                    <div class="row text-center user-info bg-light mb-4">
                        <div class="w-100">
                            <img src="../assets/images/Sly.png" width="150" alt="profile">
                        </div>
                        <h5>Informations utilisateurs</h5>
                        <div class="profile-name w-100">Username : {{ capitalizeFirstLetter(user.username) }}</div>
                        <div class="list-group">
                            
                            <span>Mail : {{ user.email }}</span>
                        </div>
                        <div class="pt-3 w-100">
                            <b-icon icon="pencil" font-scale="1" style="margin-right: 5px;"></b-icon>
                            <button @click="openModal()" class="link-nav" style="font-size: smaller; border: none; background: none;">Editer</button>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 m-lg-5 d-flex justify-content-center">
                    <ExchangeForm />
                </div>
            </div>
            <div class="col-md list-container">
                    <hr>
                    <div class="row mt-5 user-list-container">
                        <div class="p-3 user-ownlist">
                            <h5 class="m-auto" style="color: rgba(41, 100, 124);">Liste de jeux possédés : {{ownGames.length}}</h5>
                            <div class="d-flex list-list" v-if="ownGames">
                                 <transition-group name="bounce" appear appear-class="bounce-enter" class="d-flex list-list">
                                    <ProfilGameCardOwn v-for="(game) in ownGames" :key="game.name + 'own'" :game="game" class="" />
                                </transition-group>
                            </div>
                        </div>
                        <span v-if="!ownGames.length" class="no-game-list"><router-link class="link-gameslist" to="/owngameslist">Cliquez ici pour ajouter des jeux !</router-link></span>
                    </div>
                    <hr>
                    <div class="row mt-5 user-list-container">
                        <div class="p-3 user-wishlist" >
                            <h5 class="m-auto" style="color: rgba(41, 100, 124);">Liste de jeux souhaités : {{wishGames.length}}</h5>   
                            <div>
                                <transition-group name="bounce" appear appear-class="bounce-enter" class="d-flex list-list">
                                    <ProfilGameCarWish v-for="(game) in wishGames" :key="game.name + 'wish'" :game="game" class="" />
                                </transition-group>
                            </div>
                        </div>
                        <span v-if="!ownGames.length" class="no-game-list"><router-link class="link-gameslist" to="/wishgameslist">Cliquez ici pour ajouter des jeux !</router-link></span>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import ProfilGameCardOwn from "../components/Card/Profil_Game_Card.vue";
import { Igdb } from '../lib/Services/Igdb';
import { User } from '../lib/Services/User';
import ExchangeForm from '../components/Exchange/exchangeForm.vue';
import ProfilGameCarWish from "../components/Card/Profil_Game_Card_Wish.vue";
import Modal from '../components/Modals/Modal.vue';

export default {
    components: {
        ProfilGameCardOwn,
        ExchangeForm,
        ProfilGameCarWish,
        Modal
    },
    data() {
        return {
            ownGames: [],
            wishGames: [],
            user: {},
            isOpenModal: false,
        }
    },
    created() {
        this.getUserOwnGames();
        this.getUserWishGames();
        this.getCurrentUser();
    },
    computed: {
        gameCover: function () {
            return "//images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png";
        },
        backgroundCover: function () {
            return "background: url(https://images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png);background-repeat: no-repeat;background-size: cover;background-position: 50% 50%;";
        },
    },
    methods: {
        async getUserOwnGames() {
            var provider = new User()
            var providerGame = new Igdb()
            provider.auth.me().then(response => {
                if (response && response.ownGames.length > 0) {
                    providerGame.getGames(response.ownGames).then(response => {
                        if(response) {
                            this.$data.ownGames = response
                        }
                    })
                }
            })
        },
        async getUserWishGames() {

            var provider = new User()
            var providerGame = new Igdb()
            provider.auth.me().then(response => {
                if (response && response.wishGames.length > 0) {
                    providerGame.getGames(response.wishGames).then(response => {
                        if(response) {
                            this.$data.wishGames = response
                        }
                    })
                }
            })
        },
        async getCurrentUser() {
            var provider = new User()
            provider.auth.me().then(response => {
                if (response) {
                    this.$data.user = response
                }
            })
        },
        supGame(game_id, list) {
            var provider = new User()
            provider.auth.me().then(response => {
                if (response) {
                    if (list == "own") {
                        response.ownGames.splice(response.ownGames.indexOf(game_id), 1)
                        provider.patchUser(response.id, { "ownGames": response.ownGames })
                        this.$fire({
                            title: "Suppression réussie",
                            text: "Votre jeu a bien été supprimé de votre liste de jeux possédés",
                            type: "success",
                        }).then(() => {
                           this.$data.ownGames.map(game => {
                                if (game.id == game_id) {
                                    this.$data.ownGames.splice(this.$data.ownGames.indexOf(game), 1)
                                }
                            })
                        })
                    } else {
                        response.wishGames.splice(response.wishGames.indexOf(game_id), 1)
                        provider.patchUser(response.id, { "wishGames": response.wishGames })
                        this.$fire({
                            title: "Suppression réussie",
                            text: "Votre jeu a bien été supprimé de votre liste de jeux souhaités",
                            type: "success",
                        }).then(() => {
                             this.$data.wishGames.map(game => {
                                if (game.id == game_id) {
                                    this.$data.wishGames.splice(this.$data.wishGames.indexOf(game), 1)
                                }
                            })
                        })
                    }
                }
                else {
                    this.$fire({
                        title: "Erreur",
                        text: "Une erreur est survenue lors de la suppression de votre jeu",
                        type: "error",
                    }).then(() => {
                        window.location.href = "/profile"
                    })
                }
            })
        },
        capitalizeFirstLetter(string) {
            if(string !== null && string !== undefined) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        },
        openModal() {
            this.isOpenModal = true;
        },
        closeModal() {
            this.isOpenModal = false;
        }
    },
    provide() {
        return {
            supGame: this.supGame,
            openModal: this.openModal,
            closeModal: this.closeModal
        }
    },
}
</script>

<style>
.link-nav {
    text-decoration: none;
    color: rgba(41, 100, 124);
}
.link-nav:hover {
    color: #FB5D19;
    transition: color 0.2s;
}

.list-wrapper {
    width: -webkit-fill-available;
    margin-top: 30px;
}

.profile-container {
    display: flex;
    padding: 20px;
    background-color: #fafafa;
    justify-content: space-between;
    height: 800px;
}

.link-gameslist{
    text-decoration: none;
    color: #FB5D19;
    font-size: 18px;
}

.user-info {
    border-radius: 20px;
    padding: 30px 0px; 
}

.profile-img img {
    width: 150px;
}

.profile-name {
    color: rgb(255, 94, 0);
    font-size: 20px;
}

.profile-nbr-swap img {
    width: 50px;
    height: 50px;
}

.profile-nbr-swap {
    display: flex;
    align-self: center;
    align-items: center;
    width: 50%;
    justify-content: space-around;
    font-size: 70px;
    color: rgb(255, 94, 0);
}

.scrollbar {
    background: #F5F5F5;
    overflow-x: auto;
}

#style-1::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(255, 93, 25, 1);
    background-color: rgba(255, 93, 25, 1);
}

.user-ownlist {
    background-image: url('../assets/images/check.svg');
    background-size: 40px;
    background-repeat: no-repeat;
    background-position: 90% 2%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
}

.user-wishlist {
    background-image: url('../assets/images/heart.svg');
    background-size: 40px;
    background-repeat: no-repeat;
    background-position: 90% 2%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
}
.user-list-container{
    padding: 2rem;
    margin: 2rem;
}

hr{
    border: none;
    border-top: 10px solid #d1d1d1;
    color: #F5F5F5;
    overflow: visible;
    height: 5px;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}

.profile-list-container {
    padding: 30px;
    margin-top: 40px;
    height: -webkit-fill-available;
}

.exchange-form {
    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%);
    background-color: white;
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 11px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}

#bg {
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,93,25,1) 0%, rgba(121,209,194,1) 100%);
}
.fill {
    height: calc(100vh - 58px);
}

.list-group h5{
    color: #29657C;
}
.list-container{
    width: 100%;
}
.list-list{
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
}
.no-game-list{
    color: lightgrey;
    text-align: center;
}
@media screen and (max-width: 991px) {
  #bg {
    background: white;
  }
}


.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .10s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>