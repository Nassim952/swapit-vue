<template>
  <div class="container">
    <div class="card" :class="[{ full: full, small: !full }]">
      <div class="content">
        <div class="card-img">
          <img v-bind:src="coverPreUrl" width="80" height="80">
        </div>
        <div class="card-title">
          <div class="card-title-text">
            <h3>{{ game.name }}</h3>
            <span class="rating">{{Math.round(game.aggregated_rating)/10}}</span>
          </div>
          <div class="card-platforms-tags">
            <span v-for="(plateform,key) in game.platforms" id="platforms" :key="key">{{ plateform }}</span>
          </div>
        </div>
      </div>
      <div class="card-details">
        <div class="card-body">
          <div class="tags">
            <span v-for="(mode,key) in game.modes" id="modes" :key="key" class="tag tag-teal">{{ mode }}</span>
          </div>

          <p>
            {{ game.summary.slice(0, 500) }}
          </p>
          <div class="btn-wrapper">
            <DetailsButton @click="showDetails = !showDetails" title="Plus d'info" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import GameLayerDetails from './GameLayerDetails.vue';
import DetailsButton from '../Buttons/Button_Details.vue';
import {Igdb} from "../../lib/Services/Igdb";

export default {
  name: "GameLayer",
  components: {
    DetailsButton,
    // GameLayerDetails,
  },
  data: () => ({
    filters: {},
    showDetails: false,
    genres: [],
    platforms: [],
  }),
  props: {
    game: {
      type: Object,
      required: false,
    },
    full: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    if (this.$props.game) {
      var provider = new Igdb()
      provider.getGenres(this.$props.game.genres).then(response => { this.$data.genres = response})
      provider.getPlatforms(this.$props.game.platforms).then(response => { this.$data.platforms = response})
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

.btn-wrapper{
  display: flex;
  justify-content: end;
  margin-right: 15px;
}
.container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
}

.container .card {
  position: relative;
  border: none;
  width: 20rem;
  height: 30rem;
  background: rgba(255, 255, 255, 0.05);
  margin: 1rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  border-radius: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
}

.container .card.small {
  width: 20rem;
  height: 30rem;
}

.container .card.full {
  width: 100%;
  height: 30rem;
}

.card-body p {
  font-size: 1rem;
  /* margin: 0 0 40px; */
}

.container .card .content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
}

.container .card .content .card-img {
  top: 2em;
  width: 16.375rem;
  height: 22.375rem;
  position: relative;
  overflow: hidden;
  transition: 0.5s ease-in-out;
}

.container .card .content .card-img img {
  position: absolute;
  width: 100%;
  border-radius: 15px;
  height: auto;
  object-fit: cover;
}

.container .card .content .card-title {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 2.5rem;
  transition: 0.5s ease-in-out;
  /* top: 2em; */
  width: 9.375rem;
  height: 9.375rem;
}


.container .card .content .card-title {
  color: rgba(255, 93, 25, 1);
  text-transform: uppercase;
  letter-spacing: 0.125rem;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.1em;
  width: 750px;
}

.container .card .content .card-title .card-platforms-tags {
  font-size: 0.75rem;
  width: 100%;
  text-transform: initial;
  transition: 0.5s ease-in-out;
}

.container .card .content .card-title .card-platforms-tags span {
  margin: 2%;
  text-transform: initial;
}

.container .card .card-details {
  position: absolute;
  bottom: 1em;
  left: 2vw;
  display: flex;
  margin-left: 287px;
}

.container .card .card-details .card-body {
  list-style: none;
  margin: 0 10px;
  transform: translateY(2%);

  transition: all 0.75s ease-out;
  opacity: 0;
}

.container .card .card-details .card-body .tags {
  display: flex;
  flex-wrap: wrap;
}

.container .card .card-details .card-body a {
  color: rgba(255, 93, 25, 1);
  font-size: 1.25rem;
}

.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 8px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 0.5rem;
}

.tag:hover {
  background: #fff;
  color: #cccccc;
}

.tag-teal {
  background-color: rgba(255, 93, 25, 1);
}





.container .card.full:hover .content {
  transform: translateY(-30%);
}

.container .card.small:hover .content {
  transform: translateY(-50%);
}

.container .card.small:hover .content .card-title .card-platforms-tags {
  opacity: 0;
}

.container .card:hover .card-details .card-body {
  transform: translateY(0vmin);
  opacity: 1;
}

/* .container .card:hover .content .card-img {
  top: 2em;
	width: 3em;
  height: 3em;
}

.container .card:not(:hover) .content .card-img {
  top: 2em;
	width: 3em;
  height: 3em;
  width: 9.375rem;
	height: 9.375rem;
} */

.container .card.small:hover .content .card-img {
  width: 3rem;
  height: 3rem;
  max-width: 15vw;
  max-height: 15vw;
}

/* 
.container .card.small:not(:hover) .content .card-img {
  top: 2em;
  width: 9.375rem;
	height: 9.375rem;
  max-width: 30vw;
  max-height: 30vw;
} */

.container .card.full:hover .content .card-img {
  top: 5rem;
  width: 16.375rem;
  height: 22.375rem;
  transform: translate(-7vw, 3vw);
  transform: height
}

.container .card.full:hover .content .card-title {
  transform: translate(-8vw, 0vh);

}

.card-title {
  width: webkit-fill-available;
}

/* .container .card.full:not(:hover) .content .card-img {
  top: 2em;
  width: 9.375rem;
	height: 9.375rem;
} */

@media screen and (max-width: 400px) {
  .container .card:hover .content {
    opacity: 0;
  }
}
</style>