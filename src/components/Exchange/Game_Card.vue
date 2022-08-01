<template>
  <div class="game_card_search">
    <img v-bind:src="coverPreUrl" class="cover_card_search">
    <div class="game_name_card_search">
      <div>{{game.name}}</div>
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

.game_card_search{
  margin: auto;
  display: flex;
  width: 20rem;
  height: 4rem;
  overflow: hidden;
}
.icon-wrapper {
  margin: auto;
}
.cover_card_search {
    width: auto;
    height: 100%;
    border-radius: 10px;
    margin-right: 20px;
}
.game_name_card_search{
  align-self: center;

}
</style>