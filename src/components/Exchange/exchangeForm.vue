<template>
    <div class="row mb-2">
        <div class="exchange-el-card" style="background-color: #FF5D19;">
            <div class="card-body text-align-center">
                <h5 style="text-align: center;">Demandes reçu :</h5>

                <ul v-if="receivedExchanges.length" class="list-group list-group-flush" style="overflow-y: visible;">
                    <li class="list-group-item" v-for="(exchange, key) in receivedExchanges" :key="key + exchange.id + 114">
                        <ExchangeCardAccept v-if="exchange.confirmed == null" :exchange="exchange" />
                    </li>
                </ul>
                
                <ul v-else>
                    <li class="list-group-item">L'utilisateur n'a reçu aucune demande d'échange</li>
                </ul>
            </div>
        </div>      
        <div class="exchange-el-card" style="background-color: #7AD1C2;">
            <div class="card-body text-align-center">
                <h5 style="text-align: center;">Demandes envoyées :</h5>

                <ul v-if="sentExchanges.length" class="list-group list-group-flush" style="overflow-y: visible;">
                    <li class="list-group-item" v-for="(exchange, key) in sentExchanges" :key="key + exchange.id + 114">
                        <ExchangeCard v-if="exchange.confirmed == null" :exchange="exchange" />
                    </li>
                </ul>

                <ul v-else>
                    <li class="list-group-item">L'utilisateur n'a envoyé aucune demande d'échange</li>
                </ul>
            </div>
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
            if (type == 'cancel') {
                provider.cancelExchanges(exchange_id).then(() => {
                    this.$fire({
                        title: 'Succès',
                        text: 'L\'échange a bien été annulé',
                        type: 'success'
                    }).then(() => {
                        this.refreshExhanges();
                    });
                }).catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors de l\'annulation de l\'échange',
                        type: 'error'
                    });
                });
            }
            else if(type == 'refused') {
                provider.refuseExchanges(exchange_id)
                    .then((response) => {
                        console.log(response);
                        this.$fire({
                            title: 'Succès',
                            text: 'L\'échange a bien été refusé',
                            type: 'success'
                        }).then(() => {
                            this.refreshExhanges();
                        });
                    }).catch(() => {
                        this.$fire({
                            title: 'Erreur',
                            text: 'Une erreur est survenue lors du refus de l\'échange',
                            type: 'error'
                        });
                    });
            }
        },
        acceptExchange(exchange_id) {
            const provider = new Exchange();

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
                .catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenue, veuillez réessayer',
                        type: 'error'
                    })
                });
            provider.getSendExchanges(this.$data.user.id)
                .then(response => {
                    if (response) {
                        this.sentExchanges = response;
                    }
                })
                .catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenue, veuillez réessayer',
                        type: 'error'
                    })
                });
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

h4 {
    color: rgba(41, 100, 124);
}

h5 {
    color: white;
}
.exchange-el-card{
    margin: 2rem 0;
}
</style>