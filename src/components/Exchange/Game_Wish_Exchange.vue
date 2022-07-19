<template>
  <div>
    <div v-if="this.$props.matchingGames" class="game_card_list">
      <div class="game_card_container" v-for="(game, key)  in matchingGames" id="OwnList" :key="game.title + key">
        <GameCard :game="game" />
        <div v-if="!gameIsSelected(game)" class="add">
          <!-- <a v-if="gameOwn(game.id)" @click="setWishSelected(game)" title="arrow icons" class="my-icon">
            <img class="icon" src="../../assets/icones/add.png">
          </a> -->
          <a @click="addOwn(game)" title="arrow icons" class="my-icon">
            <img class="icon" src="../../assets/icones/add.png">
          </a>
        </div>
      </div>
    </div>
    <div v-if="this.$props.unMatchingGames" class="game_card_list">
      <div class="game_card_container" v-for="(game, key)  in unMatchingGames" id="OwnList" :key="game.title + key">
        <GameCard :game="game" />
        <div v-if="!gameIsSelected(game)" class="addOwn">
          <a @click="addGameOwnList(game.id)" title="arrow icons" class="my-icon">
            <img class="icon" src="../../assets/images/check.svg">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from './Game_Card.vue';
export default {
  components: {
    GameCard,
  },
  name: "Game_Wish_Exchange",
  props: {
    matchingGames: {
      type: Array,
      required: true,
    },
    unMatchingGames: {
      type: Array,
      required: true,
    },
    // games: {
    //   type: Array,
    //   required: true
    // },
  },
  inject: ['setWishSelected', 'gameOwn', 'addOwn', 'gameWishSelected', 'gameIsSelected', 'addGameOwnList'],
  data() {
    return {
      showSection: false,
      toggleIcon: "../../assets/icones/add.png",
    }
  },
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
  width: 2rem;
  height: 2rem;
}

.game_card_container {
  display: flex;
  margin-bottom: 1rem;
}

.add {
  height: 4rem;
  border-radius: 0 1rem 1rem 0;
  display: flex;
  align-items: center;
  background-color: rgba(255, 93, 25, 1);
  cursor: pointer;
}

.addOwn{
  height: 4rem;
  border-radius: 0 1rem 1rem 0;
  display: flex;
  align-items: center;
  background-color: #b9ffb3;
  cursor: pointer;
}
</style>