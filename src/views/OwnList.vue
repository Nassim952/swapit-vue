<template>
    <div class="own-list-container">
        <div class="col-md-10 col-lg-12 col-xl-12 order-1 order-lg-1 p-5">
            <p class="page-name">Liste de jeux possedés</p>
            <GameSearchInput route="own"/>
        </div>
    </div>
</template>

<script>

import GameSearchInput from "../components/Card/Game_Search_Input.vue"

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
.fill {
    height: calc(100vh - 58px);
}


@media screen and (max-width: 991px) {

}
</style>