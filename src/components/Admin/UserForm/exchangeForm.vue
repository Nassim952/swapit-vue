<template>
    <div class="list-exchange-container">
        <h2 class="title-block">Listes d'échanges</h2>
        <h4>Demandes d'échanges reçu</h4>
        <div v-if="receivedExchanges.length">
            <div class="list-exchange" v-for="(exchange, key) in receivedExchanges" :key="key + exchange.id + 114">
                <ExchangeCard :exchange="exchange" />
            </div>
        </div>
        <div v-else>
            <p>L'utilisateur n'a reçu aucune demande d'échange</p>
        </div>
        <h4>Demandes d'échanges envoyées</h4>
        <div v-if="sentExchanges.length">
            <div class="list-exchange" v-for="(exchange, key) in sentExchanges" :key="key + exchange.id + 114">
                <ExchangeCard :exchange="exchange" />
            </div>
        </div>
        <div v-else>
            <p>L'utilisateur n'a envoyé aucune demande d'échange</p>
        </div>
    </div>
</template>

<script>
import { Exchange } from '../../../lib/Services/Exchange.js';
import { User } from '../../../lib/Services/User';
import ExchangeCard from './exchangeCard.vue';

export default {
    name: 'ExchangeForm',
    components: {
        ExchangeCard
    },
    data: function () {
        return {
            sentExchanges: [],
            receivedExchanges: [],
            receivedExchangesTmp: [],
            sentExchangesTmp: [],
            user: {},
        }
    },
    created() {
        this.getCurrentUser();
    },
    methods: {
        supExchange(exchange_id) {
            const provider = new Exchange();
            provider.delExchange(exchange_id)
                .then((response) => {
                    if (response) {
                        this.refreshExhanges();
                    }
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
                        text: 'Une erreur est survenue',
                        type: 'error'
                    })
                })
            provider.getSendExchanges(this.$data.user.id)
                .then(response => {
                    if (response) {
                        this.sentExchanges = response;
                    }
                })
                .catch(() => {
                    this.$fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenue',
                        type: 'error'
                    })
                })
        },
        async getCurrentUser() {
            var provider = new User()
            provider.getUser(this.$route.params.id).then(response => {
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