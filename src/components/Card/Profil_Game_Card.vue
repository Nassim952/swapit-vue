<template>
  <div class="profil-game-card-container">
    <div class="cover-game-card">
      <div class="cover-wrap">
        <img style="width: 100px; border-radius: 10px;" v-bind:src="coverPreUrl" alt="cover">
        <div class="game-container">
          <div class="game-name">{{ game.name }}</div>
          <div class="info-game-wrapper">
            <span v-for="(genre, key) in genres.slice(0,1)" id="genres" :key="key" class="tag tag-teal">{{ genre.name }}</span>
          </div>
        </div>
      </div>
      <div>

        <div class="game-rating">Note IGDB : {{ parseFloat(game.aggregated_rating).toFixed() }}</div>
      </div>

    </div>
  </div>
</template>

<script>
import { Igdb } from '../../lib/Services/Igdb'

export default {
  props: {
    game: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      genres: [],
      platforms: [],
    }
  },
  created() {
    if (this.$props.game) {
      var provider = new Igdb()
      var genres = this.$props.game.genres.map(genre => genre.replace(/\/api\/genres\//g, '')) ?? null
      var platforms = this.$props.game.platforms.map(platform => platform.replace(/\/api\/platforms\//g, '')) ?? null
      provider.getGenres(genres).then(response => { this.$data.genres = response })
      provider.getPlatforms(platforms).then(response => { this.$data.platforms = response })
    }
  },
  computed: {
    coverPreUrl: function () {
      return "//images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png";
    },
    backgroundCover: function () {
      return "background: url(https://images.igdb.com/igdb/image/upload/t_1080p/" + this.game.cover + ".png);background-repeat: no-repeat;background-size: cover;background-position: 50% 50%;";
    },
  },
};
</script>

<style scoped>
.cover-game-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #D4E0E5;
  padding: 20px;
  border-radius: 15px;
}

.game-rating {
  color: #384546;
}

.game-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 30px;
}

.info-game-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
  color: #384546;
}

.game-name {
  color: #384546;
  font-weight: bold;
  font-size: larger;
}

.cover-wrap {
  display: flex;
  width: 200px;
  justify-content: space-between;
}
</style>