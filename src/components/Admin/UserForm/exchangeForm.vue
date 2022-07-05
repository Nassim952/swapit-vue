<template>
    <div class="list-exchange-container">
        <h2>Echange</h2>
        <div class="list-exchange">
            <div class="exchange-el">
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
            <button class="btn-delete-exchange"><img src="../../../assets/images/bin.png" height="10" width="10"></button>
        </div>
    </div>
</template>

<script>
 
export default {
	name:'ExchangeForm',
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