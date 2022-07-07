<template>
    <div>
        <div class="profile-container">
            <div class="profile-bloc user-info">
                <div class="profile-img"><img src="../assets/images/Sly.png" alt="profile"></div>
                <div class="profile-name">{{ user.username }}</div>
                <div class="profile-nbr-swap"><span>5</span><img src="../assets/images/swap.png" alt="swap"></div>
            </div>
            <div class="profile-bloc user-ownlist scrollbar" id="style-1">
                <h3>Liste de jeux possédés</h3>
                <div class="list-wrapper">
                    <ProfilGameCard v-for="(game, key) in ownGames" :key="game.id + key" :game="game" class="" />
                </div>
            </div>
            <div class="profile-bloc user-wishlist scrollbar" id="style-1">
                <h3>Liste de jeux souhaités</h3>
                <div class="list-wrapper">
                    <ProfilGameCard v-for="(game, key) in wishGames" :key="game.id + key" :game="game" class="" />
                </div>
            </div>


        </div>
        <div class="exchange-form">
            <ExchangeForm/>
        </div>
    </div>
</template>

<script>
import ProfilGameCard from "../components/Card/Profil_Game_Card.vue";
import { Igdb } from '../lib/Services/Igdb'
import { User } from '../lib/Services/User'
import jwt_decode from 'jwt-decode'
import ExchangeForm from '../components/Exchange/exchangeForm.vue'

export default {
    components: {
        ProfilGameCard,
        ExchangeForm
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
            var token = localStorage.getItem('token');
            var decoded = jwt_decode(token);

            var provider = new User()
            var providerGame = new Igdb()
            provider.getUsers(null, null, { "email": decoded.email }).then(response => {
                if (response) {
                    response = response.shift()
                    response.ownGames.forEach(element => {
                        providerGame.getGames(null, null, { "id": element }).then(response => {
                            this.$data.ownGames.push(response.shift())
                            console.log(this.$data.ownGames)
                        })
                    });
                }
            })
        },
        async getUserWishGames() {
            var token = localStorage.getItem('token');
            var decoded = jwt_decode(token);

            var provider = new User()
            var providerGame = new Igdb()
            provider.getUsers(null, null, { "email": decoded.email }).then(response => {
                if (response) {
                    response = response.shift()
                    response.wishGames.forEach(element => {
                        providerGame.getGames(null, null, { "id": element }).then(response => {
                            this.$data.wishGames.push(response.shift())
                            console.log(this.$data.wishGames)
                        })
                    });
                }
            })
        },
        async getCurrentUser() {
            var token = localStorage.getItem('token');
            var decoded = jwt_decode(token);

            var provider = new User()
            provider.getUsers(null, null, { "email": decoded.email }).then(response => {
                if (response) {
                    response = response.shift()
                    this.$data.user = response
                }
            })
        },
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
    justify-content: space-between;
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