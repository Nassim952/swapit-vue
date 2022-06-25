<template>
    <div>
        <p class="page-name">Liste de jeux possedés</p>
        <GameSearchInput/>
    </div>
</template>

<script>

import GameSearchInput from "../components/Card/Game_Search_Input_ownGame.vue"

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
</style>