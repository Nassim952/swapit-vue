<template>

  <div class="game_card_list_result" v-if="games">
    <div class=title-result>Résultats</div>
    <transition-group name="bounce" appear appear-class="bounce-enter">
      <div class="game_card_result_container" v-for="(game,key) in games" :key="key">
        <GameCard :game="game" />
        <a v-if="!added(game.id)" @click="add(game)" class="btn-add-list">
          <img class="img-btn-add-list" style=""
          src="../../assets/icones/add.png"
          alt="Ajouter à ma liste">
          </a>
      </div>  
    </transition-group>
  </div>
</template>

<script>
import GameCard from '../Exchange/Game_Card.vue';
export default {
   components: {
      GameCard,
      },
  name: "Game_Card_List_Add",
  props: {
    games: {
      type: Array,
    },
    onSubmit: {
      type: Function
    }
  },
  inject: ['add', 'added'],
  data() {
    return {
      showSection: false, 
      toggleIcon: "../../assets/icones/add.png",
    }
  },
};
</script>

<style scoped>

.game_card_list_result {
  height: 350px;
  box-shadow: lightgrey 0px 15px 10px 1px;
  border-radius: 2rem;
  padding: 1rem 3.5rem;
  overflow-y: scroll;
}

.game_card_result_container {
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: rgb(236, 236, 236) 2px solid;
}
.title-result{
  font-weight: bold;
  margin: 1rem 0rem;
  color: lightgrey;
}
.img-btn-add-list{
  width: 1.5rem;
  height: 1.5rem;
  margin: auto;
  cursor: pointer;
}
.btn-add-list{
  align-self: center;
  border-radius: 3px;
}
.btn-add-list:hover{
  border: 2px solid black;
  transition: all 0.1s ease
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