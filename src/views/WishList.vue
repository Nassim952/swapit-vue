<template>
    <div id="bg" class="position-relative fill">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-10">

                    <div class="row justify-content-center" style="background-color: white; border-radius: 25px;">
                        <div class="col-md-10 col-lg-6 col-xl-6 order-1 order-lg-1 p-5">
                            <p class="page-name">Liste de jeux souhaités</p>
                            <GameSearchInput route="wish"/>
                            <UserCard/>
                        </div>

                        <div class="col-md-10 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center order-2 order-lg-2 manettes" style="border-radius: 25px;">
                            <img style="width: 16rem" src="../assets/images/heart.svg" class="img-fluid" alt="Sample image">
                        </div>
                    </div>
                        
                </div>
            </div>
        </div>
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