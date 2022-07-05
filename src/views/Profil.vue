<template>
    <div class="profile-container">
        <div class="profile-bloc user-info">
            <div class="profile-img"><img src="../assets/images/user.svg" alt="profile"></div>
            <div class="profile-name">{{user.username}}</div>
            <div class="profile-note">3</div>
            <div class="profile-nbr-swap"><span>5</span><img src="../assets/images/swap.png" alt="swap"></div>
        </div>
        <div class="profile-bloc user-ownlist">
            <h3>Liste de jeux possédés</h3>
            <ProfilGameCard v-for="(game, key) in ownGames" :key="game.id + key" :game="game" class="profile-list-container"/>
        </div>
        <div class="profile-bloc user-wishlist">
            <h3>Liste de jeux souhaités</h3>
            <ProfilGameCard v-for="(game, key) in wishGames" :key="game.id + key" :game="game" class="profile-list-container"/>
        </div>
    </div>
</template>

<script>
import ProfilGameCard from "../components/Card/Profil_Game_Card.vue";
import { Igdb } from '../lib/Services/Igdb'
import { User } from '../lib/Services/User'
import jwt_decode from 'jwt-decode'

export default {
    components: {
        ProfilGameCard,
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

.user-ownlist {
    width: 38%;
    background-image: url('../assets/images/check.svg');
    background-size: 100px;
    background-repeat: no-repeat;
    background-position: 90% 2%;
}

.user-wishlist {
    width: 38%;
    background-image: url('../assets/images/heart.svg');
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: 90% 2%;
}

.profile-bloc>h3 {
    color: rgba(41, 100, 124);
}

.profile-list-container {
    padding: 30px;
    margin-top: 40px;
    height: -webkit-fill-available;
}
</style>