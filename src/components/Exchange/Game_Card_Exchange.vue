<template>
  <div class="game_card_list">
    <div  v-if="gameToExchange !== null" class="game_card">
      <GameCard :game="gameToExchange" />
      <a @click="resetToExchangeSelected()" title="arrow icons" class="my-icon">
        <img class="icon"
        src="../../assets/icones/delete.png"
        alt="Grapefruit slice atop a pile of other slices">
        </a>
    </div>
    <div v-if="gameWish !== null" class="game_card">
      <GameCard  :game="gameWish" />
      <a  @click="resetWishSelected()" title="arrow icons" class="my-icon">
        <img class="icon"
        src="../../assets/icones/delete.png"
        alt="Grapefruit slice atop a pile of other slices">
        </a>
    </div>
  </div>
</template>

<script>
import GameCard from './Game_Card.vue';
export default {
  name: "Game_Card_Exchange",
   components: {
      GameCard,
      },
  props: {
    gameToExchange: {
      type: Object,
    },
    gameWish: {
      type: Object,
    },
  },
  inject: ['resetToExchangeSelected', 'resetWishSelected', 'gameToExchangeSelected'],
};
</script>

<style scoped>
.game_card_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  width: 100%;
}
.icon-wrapper {
  margin: auto;
  width: 100px; 
}
.icon {
    width: 1rem;
    height: 1rem;
}
</style>