<template>
    <div class="list-exchange-container">
        <h2>Echange</h2>
        <h3>reçu</h3>
        <div v-if="receivedExchanges.length">
            <div class="list-exchange" v-for="(exchange,key) in receivedExchanges" :key="key+exchange.id+114">
                <div class="exchange-el" >
                    <div class="game-info">
                        <div class="user-pseudo">Ton jeu</div>
                        <div class="game_card">
                            <img src="../../../assets/images/acv.png" width="80" height="80">
                            <div class="text-game">
                                <span>FIFA 22</span>
                            </div>
                        </div>
                    </div>
                    <img class="swap-img" src="../../../assets/images/swap.png" width="60" height="60"/>
                    <div class="game-info">
                        <div class="user-pseudo">Le jeu de Toto78</div>
                        <div class="game_card">
                            <img src="../../../assets/images/acv.png" width="80" height="80">
                            <div class="text-game">
                                <span>NBA 2K22</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="supExchange(exchange.id)" class="btn-delete-exchange"><img src="../../../assets/images/bin.png" height="10" width="10"></button>
            </div> 
        </div>
        <div v-else>
           
            <p>Vous n'avez reçu aucune demande d'échange</p>
        </div>
        <h3>Demandes d'échanges envoyées</h3>
        <div v-if="sentExchanges.length">
            <div class="list-exchange" v-for="(exchange,key) in sentExchanges" :key="key+exchange.id+114">
                <div class="exchange-el" >
                    <div class="game-info">
                        <div class="user-pseudo">Ton jeu</div>
                        <div class="game_card">
                            <img src="../../../assets/images/acv.png" width="80" height="80">
                            <div class="text-game">
                                <span>FIFA 22</span>
                            </div>
                        </div>
                    </div>
                    <img class="swap-img" src="../../../assets/images/swap.png" width="60" height="60"/>
                    <div class="game-info">
                        <div class="user-pseudo">Le jeu de Toto78</div>
                        <div class="game_card">
                            <img src="../../../assets/images/acv.png" width="80" height="80">
                            <div class="text-game">
                                <span>NBA 2K22</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="supExchange(exchange.id)" class="btn-delete-exchange"><img src="../../../assets/images/bin.png" height="10" width="10"></button>
            </div>
        </div>
        <div v-else>
            <p>Aucun échange</p>
        </div>
        
    </div>
</template>

<script>
    import {Exchange} from '../../../lib/Services/Exchange.js';
    import {User} from '../../../lib/Services/User';

export default {
	name:'ExchangeForm',
    props:{
        userId:{
            required:true,
            type:String
        }
    },
    data:function(){
        return{
            sentExchanges:[],
            receivedExchanges:[],
        }
    },
    created(){
        this.refreshExhanges();
    },
    methods:{
        supExchange(exchange_id){
            const provider = new Exchange();
            provider.delExchange(exchange_id)
            .then((response)=>{
                if(response){
                    this.refreshExhanges();
                   console.log(response)
                }
            })
            
        },
        async refreshExhanges() {
            const provider = new User();
			provider.getReceivedExchanges(this.userId)
			.then(response=>{
                if(response){
                    this.receivedExchanges = response ?? null;
                }			
			})
			.catch(err=>{
				console.log(err)
			})
            console.log(this.receivedExchanges)
            provider.getSendExchanges(this.userId)
			.then(response=>{
                if(response){
                    this.sentExchanges = response ?? null
                }			
			})
			.catch(err=>{
				console.log(err)
			})
            console.log(this.receivedExchanges)
        }

    }
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
.list-exchange-container{
    padding: 20px;
    margin-left: 20px;
}

.list-exchange{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.exchange-el{
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
.game_card img{
    width: auto;
    height: 100%;
}
.text-game span{
    color: rgb(0, 0, 0);
    padding: 10px;
}
.text-game{
    padding: 10px;
}
.swap-img{
    align-self: center;
}
.game-info{
    text-align: center;
}
.user-pseudo{
    margin-bottom: 10px;
}
.btn-delete-exchange{
    position: absolute;
    background-color: rgb(252, 87, 87);
    border: none;
    border-radius: 0px 20px 0px 10px;
    color: white;
    transition: all 0.3s ease;
    right: 40px;
    margin-top: 10px;
    padding: 3px 10px;
}
.btn-delete-exchange:hover{
    background-color: rgb(173, 0, 0);
}
</style>