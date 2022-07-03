<template>
  <div class="game_card">
    <img v-bind:src="coverPreUrl" class="icon">
    <div class="container">
      <div>{{ game.name }}</div>
      <p>{{ game.description }}</p>
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
.game_card {
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: rgba(41, 100, 124, 0.2);
  width: 8rem;
  height: 18rem;
  overflow: hidden;
  border-radius: 1rem;
}

.icon-wrapper {
  margin: auto;
}

.icon {
  width: 100%;
  height: auto
}
</style>