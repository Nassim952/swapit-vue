<template>
    <div class="game_card">
      <img v-bind:src="coverPreUrl" class="icon">
      <div class="card-body text-center">
        <p>{{ game.name }}</p>
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
  width: 8rem;
  height: 16rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 20px lightgrey;
  border-radius: 1rem;
}

.icon-wrapper {
  margin: auto;
}

.icon {
  width: 100%;
  height: auto
}

.card-body {
  padding: 5px;
  font-size: 1rem;
}

.card-body p{
  margin-block-start: 10px;
  margin-block-end: 10px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-size: 11px;
}
</style>