<template>
  <div class="game_card">
    <img v-bind:src="coverPreUrl" class="icon">
    <div class="container">
      <div>{{game.name}}</div>
      <p>{{game.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Game_Card",
  props: {
    game: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      showSection: false, 
      toggleIcon: "../../assets/icones/add.png",
    }
  },
  computed: {
    coverPreUrl: function () {
      return "//images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png";
    },
  },
};
</script>

<style scoped>

.game_card{
  margin: auto;
  display: flex;
  background-color: rgba(41, 100, 124, 0.2);
  width: 20rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 1rem 0 0 1rem;
}
.icon-wrapper {
  margin: auto;
}
.icon {
    width: auto;
    height: 100%;
}
</style>