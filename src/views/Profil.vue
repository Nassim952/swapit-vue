<template>
    <div>
        <div class="profile-container">
            <div class="profile-bloc user-info">
                <div class="profile-img"><img src="../assets/images/Sly.png" alt="profile"></div>
                <div class="profile-name">{{ capitalizeFirstLetter(user.username) }}</div>
                <!-- <div class="profile-nbr-swap"><span></span><img src="../assets/images/swap.png" alt="swap"></div> -->
            </div>
            <div class="profile-bloc user-ownlist scrollbar" id="style-1">
                <h3>Liste de jeux possédés</h3>
                <div class="list-wrapper">
                    <!-- <div v-if="ownGames.length > 0"> -->
                        <PuSkeleton height="150px" :count=6>
                            <ProfilGameCard v-for="(game, key) in ownGames" :key="game.id + key" :game="game" class="" />
                        </PuSkeleton>
                    <!-- </div> -->
                    <!-- <div v-else> -->
                        <!-- <h3>Vous n'avez ajouté aucun jeu a votre liste...</h3> -->
                    <!-- </div> -->
                </div>
            </div>
            <div class="profile-bloc user-wishlist scrollbar" id="style-1">
                <h3>Liste de jeux souhaités</h3>
                <div class="list-wrapper">
                    <!-- <div v-if="wishGames.length > 0"> -->
                        <PuSkeleton height="150px" :count=6>
                            <Profil_Game_Card_Wish v-for="(game, key) in wishGames" :key="game.id + key" :game="game" class="" />
                        </PuSkeleton>
                    <!-- </div> -->
                    <!-- <div v-else>
                        <h3>Vous n'avez ajouté aucun jeu a votre liste...</h3>
                    </div> -->
                </div>
            </div>

        </div>
        <div class="exchange-form">
            <ExchangeForm />
        </div>
    </div>
</template>

<script>
import ProfilGameCard from "../components/Card/Profil_Game_Card.vue";
import { Igdb } from '../lib/Services/Igdb'
import { User } from '../lib/Services/User'
import ExchangeForm from '../components/Exchange/exchangeForm.vue'
import Profil_Game_Card_Wish from "../components/Card/Profil_Game_Card_Wish.vue";

export default {
    components: {
        ProfilGameCard,
        ExchangeForm,
        Profil_Game_Card_Wish
    },
    data() {
        return {
            ownGames: [],
            wishGames: [],
            user: {},
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
                            window.location.href = "/profile"
                        })
                    } else {
                        response.wishGames.splice(response.wishGames.indexOf(game_id), 1)
                        provider.patchUser(response.id, { "wishGames": response.wishGames })
                        this.$fire({
                            title: "Suppression réussie",
                            text: "Votre jeu a bien été supprimé de votre liste de jeux souhaités",
                            type: "success",
                        }).then(() => {
                            window.location.href = "/profile"
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
            if(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }
    },
    provide() {
        return {
            supGame: this.supGame,
        }
    }
}
</script>

<style>
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

.profile-bloc {
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    padding: 30px;
    overflow: hidden;
}

.user-info {
    width: 18%;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 100px 0px;
}

.profile-img img {
    width: 150px;
}

.profile-name {
    color: rgb(255, 94, 0);
    font-size: 32px;
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
    overflow-y: scroll;
    margin-bottom: 25px;
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
    width: 38%;
    background-image: url('../assets/images/check.svg');
    background-size: 100px;
    background-repeat: no-repeat;
    background-position: 90% 2%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
}

.user-wishlist {
    width: 38%;
    background-image: url('../assets/images/heart.svg');
    background-size: 100px;
    background-repeat: no-repeat;
    background-position: 90% 2%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
}

.profile-bloc>h3 {
    color: rgba(41, 100, 124);
}

.profile-list-container {
    padding: 30px;
    margin-top: 40px;
    height: -webkit-fill-available;
}

.exchange-form {
    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%);
    background-color: white;
    width: 100%;
    margin-right: 20px;
}
</style>