<template>
    <transition name="bounce" appear appear-class="bounce-enter">
        <div class="container-card">
            <div class="result-card">
                <div class="info-user">
                    <div class="user-img">
                        <img src="../../assets/images/user.svg" width="80" height="80">
                    </div>
                    <div class="pseudo">{{ capitalizeFirstLetter(user.username) }}</div>
                </div>
                <div class="info-user">
                    <div class="header-card">Echanges</div>
                    <div class="nbr-card">{{ user.receivedExchanges.length + user.sendExchanges.length }}</div>
                    <div><img src="../../assets/images/swap-arrow.svg" width="30" height="30"></div>
                </div>
                <div class="info-user">
                    <div class="header-card">Jeux possédés</div>
                    <div class="nbr-card border-side">{{ user.ownGames.length }}</div>
                    <div><img src="../../assets/images/check.svg" width="30" height="30"></div>
                </div>
                <div class="info-user">
                    <div class="header-card">Jeux souhaités</div>
                    <div class="nbr-card">{{ user.wishGames.length }}</div>
                    <div><img src="../../assets/images/heart.svg" width="30" height="30"></div>
                </div>
            </div>
            <div class="btn-swap">
                <span class="btn button_slide slide_left" @click="createChannel">Messages</span>
            </div>
            <div class="btn-swap">
                <router-link v-bind:to="exchangeUrl">
                    <span class="btn button_slide slide_left">Swaper</span>
                </router-link>
            </div>
        </div>
    </transition>
</template>

<script>
import { Channel } from "../../lib/Services/Channel";
import { User } from "../../lib/Services/User";
// import { UserAdmin } from "../../lib/Services/UserAdmin";
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        game: {
            type: Object,
            required: true
        },
    },
    computed: {
        exchangeUrl() {
            return "/exchange/" + this.user.id + "/" + this.game.id;
        }
    },
    methods: {
        capitalizeFirstLetter(string) {
            if (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        },
        async createChannel() {
            var provider = new Channel()
            var userProvider = new User()
            userProvider.auth.me().then((user) => {
                if(user){  
                    userProvider.getChannels(user.id).then((channels) => {
                        var excistinChannel = this.findExistingChannel(channels)
                        if (excistinChannel) {
                            this.$router.push("/chat/" + excistinChannel.id);
                        } else {
                            provider.postChannel({
                                'subscribers': [
                                    '/users/' + this.$props.user.id,
                                ]
                            }).then((channel) => {
                                if (channel) {
                                    this.$router.push("/chat/" + channel.id);
                                }
                            });
                        }
                    }) 
                }
            }).catch(() => {
                this.$fire({
                    title: "Erreur",
                    text: "Vous devez être connecté pour accéder à cette fonctionnalité",
                    type: "error",
                })
            })
        },
         findExistingChannel(channels){
            var excistinChannel = null
            if(channels){
            channels.forEach(channel => {
                console.table(channel.subscribers)
                    if (channel.subscribers.includes('/users/' + this.user.id)) {
                        // console.log("No channel found");
                        excistinChannel = channel 
                    }
                });
                return excistinChannel
            } else {
                // console.log("channel found");
                return excistinChannel
            }
        }
    },
}
</script>

<style>
.container-card {
    margin-top: 50px;
}

.result-card {
    color: rgba(41, 100, 124);
    display: flex;
    width: 450px;
    height: 170px;
    background-color: white;
    border-radius: 10px 10px 10px 0;
    box-shadow: grey 0px 0px 10px;
    justify-content: space-between;
    padding: 20px;
}

.info-user {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.pseudo {
    font-weight: bold;
}

.header-card {
    font-size: 12px;
}

.nbr-card {
    font-size: 60px;
    font-weight: bold;
}

.border-side {
    padding: 0px 20px;
    border-left: rgba(41, 100, 124) 5px solid;
    border-right: rgba(41, 100, 124) 5px solid;
}

.btn-swap {
    background-color: rgba(255, 93, 25, 0.8);
    width: fit-content;
    height: auto;
    padding: 10px;
    border-radius: 0 0 10px 10px;
}

.btn-swap:hover {
    background-color: rgba(255, 93, 25, 1);
    transition: background-color 0.1s ease-in;
}

.btn-swap a {
    text-decoration: none;
    color: white;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>