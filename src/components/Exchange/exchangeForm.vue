<template>
    <div class="list-exchange-container">
        <h2 class="title-block">Listes d'échanges</h2>
        <h4>Demandes d'échanges reçu :</h4>
        <div v-if="receivedExchanges.length">
            <div class="list-exchange" v-for="(exchange, key) in receivedExchanges" :key="key + exchange.id + 114">
                <ExchangeCardAccept v-if="exchange.confirmed == null" :exchange="exchange" />
            </div>
        </div>
        <div v-else>
            <p>L'utilisateur n'a reçu aucune demande d'échange</p>
        </div>
        <br />
        <h4>Demandes d'échanges envoyées :</h4>
        <div v-if="sentExchanges.length">
            <div class="list-exchange" v-for="(exchange, key) in sentExchanges" :key="key + exchange.id + 114">
                <ExchangeCard v-if="exchange.confirmed == null" :exchange="exchange" />
            </div>
        </div>
        <div v-else>
            <p>L'utilisateur n'a envoyé aucune demande d'échange</p>
        </div>
    </div>
</template>

<script>
import { Exchange } from '../../lib/Services/Exchange.js';
import { User } from '../../lib/Services/User';
import ExchangeCard from './exchangeCard.vue';
import ExchangeCardAccept from './exchangeCardAccept.vue';

export default {
    name: 'ExchangeForm',
    components: {
        ExchangeCard,
        ExchangeCardAccept
    },
    data: function () {
        return {
            user: {},
            sentExchanges: [],
            receivedExchanges: [],
            pendingExchanges: [],
            receivedExchangesTmp: [],
            sentExchangesTmp: [],
            receivingExchange: false,
            sendingExchange: false,
        }
    },
    created() {
        this.getCurrentUser();
    },
    methods: {
        supExchange(exchange_id, type) {
            const provider = new Exchange();
            provider.refuseExchanges(exchange_id)
                .then((response) => {
                    if (response) {
                        if (type == 'cancel') {
                            this.$fire({
                                title: 'Succès',
                                text: 'L\'échange a bien été annulé',
                                type: 'success'
                            }).then(() => {
                                this.refreshExhanges();
                            });
                        } else {
                            this.$fire({
                                title: 'Succès',
                                text: 'L\'échange a bien été refusé',
                                type: 'success'
                            }).then(() => {
                                this.refreshExhanges();
                            });
                        }
                    } else {
                        this.$fire({
                            title: 'Erreur',
                            text: 'Une erreur est survenue',
                            type: 'error'
                        })
                    }
                })
        },
        acceptExchange(exchange_id) {
            const provider = new Exchange();
            // const providerUser = new User();

            // provider.getExchange(exchange_id).then((response) => {
            //     var ownerId = response.owner.slice(7)
            //     var proposerId = response.proposer.slice(7)
            //     var ownerGame = response.senderGame
            //     var proposerGame = response.proposerGame

            //     providerUser.getUser(ownerId).then((response) => {
            //         const index = response.ownGames.indexOf(ownerGame)
            //         if (index > -1) {
            //             response.ownGames.splice(index, 1)
            //             provider.patchUser(ownerId, { 'ownGames': response.ownGames })
            //         }
            //     })

            //     providerUser.getUser(proposerId).then((response) => {
            //         const index = response.wishGames.indexOf(proposerGame)
            //         if (index > -1) {
            //             response.ownGames.splice(index, 1)
            //             provider.patchUser(proposerId, { 'wishGames': response.proposerGame })
            //         }
            //     })
            // })

            provider.validExchanges(exchange_id)
                .then((response) => {
                    if (response) {
                        this.$fire({
                            title: 'Succès',
                            text: 'L\'échange a bien été validé',
                            type: 'success'
                        }).then(() => {
                            this.refreshExhanges();
                        })
                    } else {
                        this.$fire({
                            title: 'Erreur',
                            text: 'Une erreur est survenue',
                            type: 'error'
                        })
                    }
                }).catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenue',
                        type: 'error'
                    })
                })
        },
        async refreshExhanges() {
            const provider = new User();
            provider.getReceivedExchanges(this.$data.user.id)
                .then(response => {
                    if (response) {
                        this.receivedExchanges = response;
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            provider.getSendExchanges(this.$data.user.id)
                .then(response => {
                    if (response) {
                        this.sentExchanges = response;
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            // provider.getPendingExchanges(this.$data.user.id)
            //     .then(response => {
            //         if (response) {
            //             this.pendingExchanges = response;
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
        },
        async getCurrentUser() {
            var provider = new User()
            provider.auth.me().then(response => {
                if (response) {
                    this.$data.user = response
                    this.refreshExhanges();
                }
            })
        },
    },
    provide() {
        return {
            supExchange: this.supExchange,
            acceptExchange: this.acceptExchange,
        }
    }
};

</script>

<style scoped>
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
    background-color: #e2e2e2;
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
    color: rgb(0, 0, 0);
    padding: 10px;
}

.text-game {
    padding: 10px;
}

.swap-img {
    align-self: center;
}

.game-info {
    text-align: center;
}

.user-pseudo {
    margin-bottom: 10px;
}

.title-block {
    margin-bottom: 30px;
}
</style>