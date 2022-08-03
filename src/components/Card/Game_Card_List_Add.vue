<template>
  <div class="game_card_list scrollbar" id="style-1" v-if="games">
    <div class="game_card_container" v-for="(game,key) in games" id="OwnList" :key="key">
      <PuSkeleton height="150px" count="10">
        <GameCard :game="game"/>
      </PuSkeleton>
      <a v-if="!added(game.id)" @click="add(game)" title="arrow icons" class="my-icon">
        <img class="icon"
        src="../../assets/icones/add.png"
        alt="Ajouter à ma liste">
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
</style>