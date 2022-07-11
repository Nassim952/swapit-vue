<template>
  <!-- <div class="game_card">
    <img v-bind:src="coverPreUrl" class="icon">
    <div class="container">
      <div>{{game.name}}</div>
      <p>{{game.description}}</p>
    </div>
  </div> -->
  <div class="card m-0" style="border: 3px solid rgba(40,100,124,1); width: min-content;">
    <img class="card-img-top" v-bind:src="coverPreUrl"
      alt="Card image cap" style="width: 250px;">
    <div class="card-body d-flex flex-nowrap">
      <div class="card-text d-flex flex-wrap">
        <h5 style="width: 100%; color: #29647C; font-weight: bold;">{{ game.name }}</h5>
        <h6 style="width: 100%; color: #29647C;">PS4</h6>
      </div>
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