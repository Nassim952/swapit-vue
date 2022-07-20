<template>
  <!-- <div class="game_card">
    <img v-bind:src="coverPreUrl" class="icon">
    <div class="container">
      <div>{{ game.name }}</div>
      <p>{{ game.description }}</p>
    </div>
  </div> -->

  <div class="card game_card">
    <img v-bind:src="coverPreUrl" class="icon">
    <div class="card-body text-center">
      <p class="m-0" style="font-size: 0.7rem;">{{ game.name }}</p>
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
  background-color: rgba(41, 100, 124, 0.2);
  width: 7rem;
  border-radius: 1rem;
  overflow: hidden;
}

.icon-wrapper {
  margin: auto;
}

.icon {
  width: 100%;
  height: auto
}

.card-body {
  padding: 5px
}
</style>