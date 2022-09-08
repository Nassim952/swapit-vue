<template>
    <div class="row mb-2">
        <div class="exchange-el-card">
            <div class="card-body text-align-center">
                <h5 class="title-block-profil-swap received">Demandes reçu</h5>

                <ul v-if="receivedExchanges.length > 0" class="list-group list-group-flush list-swap">
                    <transition-group name="slide-fade" appear appear-class="slide-fade-enter">
                        <li class="" v-for="(exchange) in receivedExchanges" :key="exchange.id + '_received'">      
                                <ExchangeCardAccept v-if="exchange.confirmed == null" :exchange="exchange" />  
                        </li>
                    </transition-group>
                </ul>
                
                <ul v-else class="list-swap">
                    <li class="">Vous n'avez reçu aucune demande d'échange</li>
                </ul>
            </div>
        </div>      
        <div class="exchange-el-card">
            <div class="card-body text-align-center">
                <h5 class="title-block-profil-swap send">Demandes envoyées</h5>

                <ul v-if="sentExchanges.length > 0" class="list-group list-group-flush list-swap">
                     <transition-group name="slide-fade" appear appear-class="slide-fade-enter">
                        <li class="" v-for="(exchange) in sentExchanges" :key="exchange.id + '_sent'">
                            <ExchangeCard v-if="exchange.confirmed == null && exchange" :exchange="exchange" />      
                        </li>
                    </transition-group>
                </ul>

                <ul v-else class="list-swap">
                    <li class="">Vous n'avez envoyé aucune demande d'échange</li>
                </ul>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button v-if="!showHistorique" class="btn btn-historique" @click="showHistorique = true">Historique des demandes d'échanges</button>
            <button v-else class="btn btn-historique" @click="showHistorique = false">Fermer</button>
        </div>
        <div class="exchange-el-card historique-game-wrapper scrollbar" id="style-1" v-if="pendingExchanges.length">
            <div class="card-body text-align-center">
                <h5 class="title-block-profil-swap send">Historique des échanges</h5>

                <div v-if="pendingExchanges.length" class="list-group list-group-flush list-swap">
                    <transition-group name="slide-fade" appear appear-class="slide-fade-enter">
                        <li class="" v-for="(exchange) in pendingExchanges" :key="exchange.id + '_historique'">
                            <ExchangeCardHistorique v-if="exchange.confirmed !== null && exchange" :exchange="exchange" />      
                        </li>
                    </transition-group>
                </div>
                <div v-else class="list-swap">
                    <span>Vous n'avez aucun historique d'échange</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Exchange } from '../../lib/Services/Exchange.js';
import { User } from '../../lib/Services/User';
import ExchangeCard from './exchangeCard.vue';
import ExchangeCardAccept from './exchangeCardAccept.vue';
import ExchangeCardHistorique from './exchangeCardHistorique.vue';

export default {
    name: 'ExchangeForm',
    components: {
        ExchangeCard,
        ExchangeCardAccept,
        ExchangeCardHistorique
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
            showHistorique: false,
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
                    .then(() => {
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
    },
    watch: {
        showHistorique: function (val) {
            if (val) {
                var pendingExchanges = this.receivedExchanges.concat(this.sentExchanges);
                    pendingExchanges = pendingExchanges.filter(exchange => exchange.confirmed !== null);
                    this.pendingExchanges = pendingExchanges;
            } else {
                this.pendingExchanges = [];
            }
            console.log(this.pendingExchanges)
        }
    }
};

</script>

<style scoped>

.btn-historique{
    background-color: #29657C;
    color: white;
}

.scrollbar {
    background: #F5F5F5;
    overflow-x: auto;
    border-radius: 10px;
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

.historique-game-wrapper{
    height: 420px;
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
    font-size: 15px;
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
    color: #29657C;
}

h4 {
    color: rgba(41, 100, 124);
}
.exchange-el-card{
    margin: 2rem 0;
}
.title-block-profil-swap{
    text-align: center;
    margin-bottom: 3rem;
}
.send{
    color: rgba(41, 100, 124);
}
.received{
    color: #FF5D19;
}
.list-swap{
    list-style: none;
    text-align: center;
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>