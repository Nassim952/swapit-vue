<template>
    <div class="own-list-container">
        <div class="col-md-10 col-lg-12 col-xl-12 order-1 order-lg-1 p-5">
            <p class="page-name">Liste de jeux souhaités</p>
            <GameSearchInput route="wish"/>
        </div>
    </div>
</template>

<script>
import GameSearchInput from "../components/Card/Game_Search_Input.vue";
export default {
    components: {
        GameSearchInput,
    }
};
</script>

<style scoped>
.page-name{
    text-align: center;
    font-size: 24px;
    color: rgb(255, 94, 0);
}

#bg {
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,93,25,1) 0%, rgba(121,209,194,1) 100%);
}
.fill {
    height: calc(100vh - 58px);
}

.overflow-y {
    overflow-y: scroll;
}

.manettes {
    background-image: url(../assets/images/illustration-Manette.png);
    background-color: rgba(255, 255, 255, 0.8);
    background-blend-mode: lighten;
    background-size: cover;
}


@media screen and (max-width: 991px) {
  #bg {
    background: white;
  }
}
</style>