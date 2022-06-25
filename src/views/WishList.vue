<template>
    <div>
        <p class="page-name">Liste de jeux souhaités</p>
        <GameSearchInput/>
        <UserCard/>
    </div>
</template>

<script>

import GameSearchInput from "../components/Card/Game_Search_Input.vue";
import UserCard from "../components/Game/UserCard.vue";

export default {
    components: {
        GameSearchInput,
        UserCard,
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