<template>
    <div>
        <div class="exchange-el">
            <div class="game-info">
                <div class="user-pseudo">Jeu de {{ owner.username }}</div>
                <div class="game_card">
                    <img :src="coverPreUrl(proposerGame)" width="80" height="80">
                    <div class="text-game">
                        <span>{{ proposerGame.name }}</span>
                    </div>
                </div>
            </div>
            <img class="swap-img" src="../../assets/images/swap.png" width="40" height="40" />
            <div class="game-info">
                <div class="user-pseudo">Jeu de {{proposer.username}}</div>
                <div class="game_card">
                    <img :src="coverPreUrl(senderGame)" width="80" height="80">
                    <div class="text-game">
                        <span>{{ senderGame.name }}</span>
                    </div>
                </div>
            </div>
            <div class="text-exchange-status">
                <p v-if="exchange.confirmed == true"> accepté</p>
                <p v-else> refusé</p>
            </div>
        </div>
    </div>
</template>

<script>
import { User } from '../../lib/Services/User';
import { UserAdmin } from '../../lib/Services/UserAdmin';
import { Igdb } from '../../lib/Services/Igdb';

export default {
    name: 'exchangeCardHistorique',
    props: {
        exchange: {
            required: true,
            type: Object
        }
    },
    data: function () {
        return {
            proposer: {},
            owner: {},
            proposerGame: {},
            senderGame: {},
        }
    },
    created() {
        this.init();
    },
    methods: {
        getProposerGame(game_id) {
            const provider = new Igdb();
            provider.getGame(game_id)
                .then(response => {
                    if (response) {
                        this.proposerGame = response;
                    }
                })
                .catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenuen, veuillez réessayer',
                        type: 'error'
                    })
                });
        },
        getSenderGames(game_id) {
            const provider = new Igdb();
            provider.getGame(game_id)
                .then(response => {
                    if (response) {
                        this.senderGame = response;
                    }
                })
                .catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenuen, veuillez réessayer',
                        type: 'error'
                    })
                });
        },
        getOwner(id) {
            const provider = new UserAdmin();

            provider.getUser(id)
                .then(response => {
                    if (response) {
                        this.owner = response;
                    }
                })
                .catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenuen, veuillez réessayer',
                        type: 'error'
                    })
                });
        },
        getProposer(id) {
            const provider = new User();
            provider.getUser(id)
                .then(response => {
                    if (response) {
                        this.proposer = response;
                    }
                })
                .catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenuen, veuillez réessayer',
                        type: 'error'
                    })
                });
        },
        init() {
            this.getProposerGame(this.exchange.proposerGame);
            this.getSenderGames(this.exchange.senderGame);
            this.getOwner(this.exchange.owner.replace(/\/users\//g, ''));
            this.getProposer(this.exchange.proposer.replace(/\/users\//g, ''));
        },
        coverPreUrl: function (game) {
            return "//images.igdb.com/igdb/image/upload/t_1080p/" + game.cover + ".png";
        },
    },
    inject: ['supExchange', 'acceptExchange'],
    /* game: {
      type: Object,
      required: true
    },
    computed: {
    coverPreUrl: function () {
      return "//images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png";
    },
  }, */
};

</script>

<style scoped>

.text-exchange-status{
    color: rgb(255, 94, 0);
}
.list-exchange-container {
    padding: 20px;
    margin-left: 20px;
}

.list-exchange {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.exchange-el {
    margin-top: 10px;
    display: flex;
    border-radius: 20px;
    border: 1px solid #e2e2e2;
    padding: 20px;
    justify-content: space-between;
}

.game_card {
    display: flex;
    background-color: lavender;
    height: 5rem;
    width: 20rem;
    overflow: hidden;
    border-radius: 10px;
    font-size: 12px;
}

.game_card img {
    width: auto;
    height: 100%;
}

.text-game span {
    font-size: 15px;
}

.text-game {
    padding: 10px;
}

.swap-img {
    align-self: center;
    margin: 20px;
}

.game-info {
    text-align: center;
}

.user-pseudo {
    margin-bottom: 10px;
    color: #29657C;
}

.btn-delete-exchange {
    background-color: rgb(252, 87, 87);
    border: none;
    border-radius: 15px 0px 10px 0px;
    color: white;
    transition: all 0.3s ease;
    padding: 3px 10px;
}

.btn-delete-exchange:hover {
    background-color: rgb(173, 0, 0);
}

.btn-dlt-ctn{
    position: absolute;
}

.btn-accept-exchange {
    position: absolute;
    background-color: rgba(96, 223, 71, 0.575);
    border: none;
    border-radius: 0px 20px 0px 10px;
    color: white;
    transition: all 0.3s ease;
    right: 75px;
    margin-top: -155px;
    padding: 3px 10px;
}

.btn-accept-exchange:hover {
    background-color: rgb(30, 255, 0);
}
</style>