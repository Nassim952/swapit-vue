<template>
  <div class="game_card_list scrollbar p-2" id="style-1" v-if="games">
    <div class="game_card_container" v-for="(game,key) in games" id="OwnList" :key="key">
      <GameCard :game="game" />
      <a v-if="!added(game.id)" @click="add(game)" title="arrow icons" class="my-icon">
        <img class="icon" style="cursor: pointer;"
        src="../../assets/icones/add.png"
        alt="Grapefruit slice atop a pile of other slices">
        </a>
    </div>
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

.game_card_list {
  height: 150px;
  box-shadow: lightgrey 0px 15px 10px 1px;
  border-radius: 2rem;
}

.scrollbar
{
	background: #F5F5F5;
	overflow-y: scroll;
	margin-bottom: 25px;
}

#style-1::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(255, 93, 25, 1);
	background-color: rgba(255, 93, 25, 1);
}

.icon-wrapper {
  margin: auto;
  width: 100px; 
  display:flex;
}

.icon-wrapper:hover {
  background-color: aqua;
}
.icon {
    width: 2rem;
    height: 2rem;
    margin: auto;
}


.game_card_container {
  display: flex;
  margin-bottom: 1rem;
}
</style>